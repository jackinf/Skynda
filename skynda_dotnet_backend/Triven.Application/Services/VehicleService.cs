using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FluentValidation.Results;
using Triven.Application.Validators.Vehicle;
using Triven.Data.EntityFramework.Entities;
using Triven.Data.EntityFramework.UnitOfWorks;
using Triven.Domain.Enums;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Feature;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Application.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository<Vehicle> _vehicleRepository;
        private readonly IVehicleDescriptionRepository<VehicleDescription> _vehicleDescriptionRepository;
        private readonly IVehicleFeatureRepository<VehicleFeature> _vehicleFeatureRepository;
        private readonly IVehicleModelRepository<VehicleModel> _vehicleModelRepository;
        private readonly IBlobStorageService _blobStorageService;
        private readonly IVehicleImageRepository<VehicleImage> _vehicleImageRepository;

        public VehicleService()
        {
            _vehicleRepository = IoC.Get<IVehicleRepository<Vehicle>>();
            _vehicleModelRepository = IoC.Get<IVehicleModelRepository<VehicleModel>>();
            _vehicleDescriptionRepository = IoC.Get<IVehicleDescriptionRepository<VehicleDescription>>();
            _vehicleFeatureRepository = IoC.Get<IVehicleFeatureRepository<VehicleFeature>>();
            _blobStorageService = IoC.Get<IBlobStorageService>();
            _vehicleImageRepository = IoC.Get<IVehicleImageRepository<VehicleImage>>();
        }

        public ServiceResult<IEnumerable<VehicleCompactViewModel>> GetAll()
        {
            var results = _vehicleRepository.GetAllWithModels();
            IEnumerable<VehicleCompactViewModel> mappedResults = Mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleCompactViewModel>>(results);
            return ServiceResult<IEnumerable<VehicleCompactViewModel>>.Factory.Success(mappedResults);
        }

        public ServiceResult<VehicleAdminViewModel> GetDetailed(int vehicleId)
        {
            if (vehicleId <= 0)
                throw new ArgumentException("Wrong id");

            try
            {
                var result = _vehicleRepository.GetDetailed(vehicleId);
                VehicleAdminViewModel mappedResult = Mapper.Map<Vehicle, VehicleAdminViewModel>(result);

                if (result.Features.Any())
                {
                    foreach (var feature in result.Features)
                    {
                        mappedResult.FeaturesAdminSelect.Add(new FeatureAdminSelectViewModel
                        {
                            Value = feature?.Feature?.Id.ToString(),
                            Label = feature?.Feature?.Name
                        });
                    }    
                }

                return ServiceResult<VehicleAdminViewModel>.Factory.Success(mappedResult);
            }
            catch (Exception e)
            {
                return ServiceResult<VehicleAdminViewModel>.Factory.Fail(e.Message);
            }
        }

        public ServiceResult<VehicleDetailedViewModel> Get(int vehicleId)
        {
            if (vehicleId <= 0)
                throw new ArgumentException("Wrong id");

            var result = _vehicleRepository.GetDetailed(vehicleId);
            VehicleDetailedViewModel mappedResult = Mapper.Map<Vehicle, VehicleDetailedViewModel>(result);
            mappedResult.CalculateFuelAverage();
            return ServiceResult<VehicleDetailedViewModel>.Factory.Success(mappedResult);
        }

        public ServiceResult<VehicleAdminViewModel> Create(VehicleAdminViewModel viewModel)
        {
            using (var unitOfWork = new UnitOfWorkEntityBase())
            {
                unitOfWork.BeginTransaction();
                try
                {
                    if (viewModel == null)
                    {
                        viewModel = new VehicleAdminViewModel();
                    }

                    VehicleValidator validator = new VehicleValidator();
                    ValidationResult results = validator.Validate(viewModel);


                    if (!results.IsValid)
                    {
                        return ServiceResult<VehicleAdminViewModel>.Factory.Fail(results.Errors);
                    }

                    Vehicle entity = Mapper.Map<Vehicle>(viewModel);

                    VehicleModel vehicleModel = _vehicleModelRepository.Get(viewModel.VehicleModel.Id, unitOfWork.Context);
                    entity.VehicleModel = vehicleModel;


                    if (viewModel.MainImage == null)
                        throw new NullReferenceException("Main image is required");

                    var mainImage = _blobStorageService.HandleMedia(viewModel.MainImage, null, unitOfWork.Context);
                    entity.MainImage = mainImage as Image;

                    /*
                     * No need to add images, reviews, reports in create
                     */

                    var result = _vehicleRepository.Add(entity, unitOfWork.Context);

                    /*
                     * Update Descriptions
                     */
                    UpdateDescriptions(result.ContextObject.Id, viewModel.Descriptions, unitOfWork);

                    /*
                     * Update Features
                     */
                    UpdateFeatures(result.ContextObject.Id, viewModel.FeaturesAdminSelect, unitOfWork);

                    VehicleAdminViewModel mappedResult = Mapper.Map<VehicleAdminViewModel>(result.ContextObject);
                    unitOfWork.Commit();

                    return ServiceResult<VehicleAdminViewModel>.Factory.Success(mappedResult, result.Message);
                }
                catch (Exception ex)
                {
                    unitOfWork.Rollback();
                    return ServiceResult<VehicleAdminViewModel>.Factory.Fail(ex.Message);
                }
            }
        }

        public ServiceResult<VehicleAdminViewModel> Update(int vehicleId, VehicleAdminViewModel viewModel)
        {
            if (viewModel == null)
                viewModel = new VehicleAdminViewModel();
            viewModel.Id = vehicleId;
            VehicleAdminViewModel mappedResult;
            IResult<Vehicle> result;

            using (var unitOfWork = new UnitOfWorkEntityBase())
            {
                unitOfWork.BeginTransaction();
                try
                {
                    if (vehicleId <= 0)
                        throw new ArgumentException("Wrong id");

                    VehicleValidator validator = new VehicleValidator();
                    ValidationResult results = validator.Validate(viewModel);

                    if (!results.IsValid)
                    {
                        return ServiceBaseResult<VehicleAdminViewModel>.Factory.Fail(results.Errors);
                    }

                    Vehicle entity = _vehicleRepository.GetDetailed(viewModel.Id);
                    Mapper.Map(viewModel, entity);
                    //VehicleModel vehicleModel = _vehicleModelRepository.Get(viewModel.VehicleModel.Id);
                    //entity.VehicleModel = vehicleModel;

                    if(viewModel.MainImage == null)
                        throw new NullReferenceException("Main image is required");

                    var mainImage = _blobStorageService.HandleMedia(viewModel.MainImage, entity.MainImage, unitOfWork.Context);
                    entity.MainImage = mainImage as Image;
                    entity.MainImageId = mainImage.Id; // TODO: think of a way to change reference in a more clean way.

                    entity.VehicleModelId = viewModel.VehicleModel.Id;  // TODO: Do not use a fucking ViewModel if we only want to change reference!

                    result = _vehicleRepository.Update(vehicleId, entity, unitOfWork.Context);

                    /*
                 * Update Images
                 */
                    if (viewModel.Images != null && viewModel.Images.Any())
                    {
                        var existingVehicleImages = _vehicleImageRepository.GetAllVehicleImages(result.ContextObject.Id);

                        List<VehicleImageViewModel> vehicleImages = new List<VehicleImageViewModel>();
                        Mapper.Map(existingVehicleImages, vehicleImages);
                        _blobStorageService.HandleMediaCollection(entity.Id, viewModel.Images, vehicleImages, unitOfWork.Context);
                    }                   

                    var images = _vehicleImageRepository.GetAllVehicleImages(result.ContextObject.Id, unitOfWork.Context);
                    result.ContextObject.Images = images;

                    mappedResult = Mapper.Map<VehicleAdminViewModel>(result.ContextObject);
                   
                    
                   
                    /*
                     * Update Features
                     */
                    UpdateFeatures(result.ContextObject.Id, viewModel.FeaturesAdminSelect, unitOfWork);

                    unitOfWork.Commit();
                }
                catch (Exception ex)
                {
                    unitOfWork.Rollback();
                    return ServiceResult<VehicleAdminViewModel>.Factory.Fail(ex.Message);
                }
            }

            try
            {
                /*
                 * Update Descriptions
                 */
                UpdateDescriptions(result.ContextObject.Id, viewModel.Descriptions);
            }
            catch (Exception ex)
            {
                return ServiceResult<VehicleAdminViewModel>.Factory.Fail(ex.Message);
            }
            


            return ServiceBaseResult<VehicleAdminViewModel>.Factory.Success(mappedResult, result.Message);

        }

        public ServiceResult<bool> Delete(int vehicleId)
        {
            if (vehicleId <= 0)
                throw new ArgumentException("Wrong id");

            bool result = _vehicleRepository.Delete(vehicleId);
            return ServiceResult<bool>.Factory.Success(result);
        }

        public ServiceResult<IList<VehicleCompactViewModel>> Search(SearchRequestViewModel parameters)
        {
            var results = _vehicleRepository.Search(parameters);
            IList<VehicleCompactViewModel> mappedResult = Mapper.Map<IList<Vehicle>, IList<VehicleCompactViewModel>> (results);
            return ServiceResult<IList<VehicleCompactViewModel>>.Factory.Success(mappedResult);
        }

        public ServiceResult<bool> Publish(int vehicleId)
        {
            if (vehicleId <= 0)
                throw new ArgumentException("Wrong id");

            var vehicle = _vehicleRepository.Get(vehicleId);
            vehicle.VehicleStatus = VehicleStatus.Published;
            var result = _vehicleRepository.Update(vehicleId, vehicle);
            return result.IsSuccess ? ServiceResult<bool>.Factory.Success(true) : ServiceResult<bool>.Factory.Fail(result.Message);
        }

        public ServiceResult<bool> Unpublish(int vehicleId)
        {
            if (vehicleId <= 0)
                throw new ArgumentException("Wrong id");

            var vehicle = _vehicleRepository.Get(vehicleId);
            vehicle.VehicleStatus = VehicleStatus.Unpublished;
            var result = _vehicleRepository.Update(vehicleId, vehicle);
            return result.IsSuccess ? ServiceResult<bool>.Factory.Success(true) : ServiceResult<bool>.Factory.Fail(result.Message);
        }

        //
        // Private methods
        //

        private void UpdateDescriptions(int vehicleId, List<VehicleDescriptionViewModel> descriptions, UnitOfWorkEntityBase unitOfWork = null)
        {
            if (vehicleId <= 0)
                throw new ArgumentException("Wrong id");

            var existingDescriptions = _vehicleDescriptionRepository.GetAllVehicleDescriptions(vehicleId, unitOfWork?.Context);

            if (existingDescriptions.Any())
            {
                foreach (var existingDescription in existingDescriptions)
                {
                    bool exists = descriptions.Any() && descriptions.Any(x => x.Id == existingDescription.Id);

                    if (!exists)
                    {
                        _vehicleDescriptionRepository.Delete(existingDescription.Id, unitOfWork?.Context);
                    }
                }
            }

            if (!descriptions.Any()) return;

            foreach (var vehicleDescriptionViewModel in descriptions)
            {
                var description = Mapper.Map<VehicleDescription>(vehicleDescriptionViewModel);
                description.Id = vehicleDescriptionViewModel.Id;
                description.VehicleId = vehicleId;

                if (existingDescriptions.Any() &&
                    existingDescriptions.Any(x => x.Id == description.Id))
                {
                    _vehicleDescriptionRepository.Update(description.Id, description);
                }
                else
                {
                    _vehicleDescriptionRepository.Add(description, unitOfWork?.Context);
                }
            }
        }

        private void UpdateFeatures(int vehicleId, List<FeatureAdminSelectViewModel> features, UnitOfWorkEntityBase unitOfWork)
        {
            if (vehicleId <= 0)
                throw new ArgumentException("Wrong id");

            var existingFeatures = _vehicleFeatureRepository.GetAllBy(vehicleId, unitOfWork.Context);

            if (existingFeatures.Any())
            {
                foreach (var existingFeature in existingFeatures)
                {
                    bool exists = features.Any() && features.Any(
                                      x => x.Value == existingFeature.FeatureId.ToString() &&
                                           existingFeature.VehicleId == vehicleId);

                    if (!exists)
                    {
                        _vehicleFeatureRepository.Delete(existingFeature.Id, unitOfWork.Context);
                    }
                }
            }

            if (!features.Any()) return;

            foreach (var vehicleFeature in features)
            {
                VehicleFeature newFeature = new VehicleFeature
                {
                    VehicleId = vehicleId,
                    FeatureId = int.Parse(vehicleFeature.Value)
                };

                bool exists = existingFeatures.Any() &&
                              existingFeatures.Any(x =>
                                  x.FeatureId == newFeature.FeatureId &&
                                  x.VehicleId == newFeature.VehicleId);

                if (!exists)
                {
                    _vehicleFeatureRepository.Add(newFeature, unitOfWork.Context);
                }
            }
        }
    }
}