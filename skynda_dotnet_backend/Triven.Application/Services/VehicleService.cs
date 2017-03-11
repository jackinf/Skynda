using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FluentValidation.Results;
using Triven.Application.Validators.Vehicle;
using Triven.Data.EntityFramework.Models;
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

        public VehicleService()
        {
            _vehicleRepository = IoC.Get<IVehicleRepository<Vehicle>>();
            _vehicleModelRepository = IoC.Get<IVehicleModelRepository<VehicleModel>>();
            _vehicleDescriptionRepository = IoC.Get<IVehicleDescriptionRepository<VehicleDescription>>();
            _vehicleFeatureRepository = IoC.Get<IVehicleFeatureRepository<VehicleFeature>>();
            _blobStorageService = IoC.Get<IBlobStorageService>();
        }

        public ServiceResult<IEnumerable<VehicleDetailedViewModel>> GetAll()
        {
            var results = _vehicleRepository.GetAll();
            IEnumerable<VehicleDetailedViewModel> mappedResults = Mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleDetailedViewModel>>(results);
            return ServiceResult<IEnumerable<VehicleDetailedViewModel>>.Factory.Success(mappedResults);
        }

        public ServiceResult<VehicleAdminViewModel> GetDetailed(int id)
        {
            try
            {
                var result = _vehicleRepository.GetDetailed(id);
                VehicleAdminViewModel mappedResult = Mapper.Map<Vehicle, VehicleAdminViewModel>(result);

                if (result.Features.Any())
                {
                    foreach (var feature in result.Features)
                    {
                        mappedResult.FeaturesAdminSelect.Add(new FeatureAdminSelectViewModel
                        {
                            Value = feature.Feature.Id.ToString(),
                            Label = feature.Feature.Name
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

        public ServiceResult<VehicleDetailedViewModel> Get(int id)
        {
            var result = _vehicleRepository.Get(id);
            VehicleDetailedViewModel mappedResult = Mapper.Map<Vehicle, VehicleDetailedViewModel>(result);
            return ServiceResult<VehicleDetailedViewModel>.Factory.Success(mappedResult);
        }

        public ServiceResult<VehicleAdminViewModel> Create(VehicleAdminViewModel viewModel)
        {
            try
            {
                VehicleValidator validator = new VehicleValidator();
                ValidationResult results = validator.Validate(viewModel);

              
                if (!results.IsValid)
                {
                    return ServiceResult<VehicleAdminViewModel>.Factory.Fail(results.Errors);
                }

                Vehicle entity = Mapper.Map<Vehicle>(viewModel);

                VehicleModel vehicleModel = _vehicleModelRepository.Get(viewModel.VehicleModel.Id);
                entity.VehicleModel = vehicleModel;


                if (viewModel.MainImage != null)
                {
                    var mainImage = _blobStorageService.HandleMedia(viewModel.MainImage, null);
                    entity.MainImage = mainImage as Image;
                }

                /*
                 * No need to add images, reviews, reports in create
                 */

                var result = _vehicleRepository.Add(entity);
                
                UpdateFeatures(result.ContextObject.Id, viewModel.FeaturesAdminSelect, result.ContextObject.Features);

                VehicleAdminViewModel mappedResult = Mapper.Map<VehicleAdminViewModel>(result.ContextObject);

                return ServiceResult<VehicleAdminViewModel>.Factory.Success(mappedResult, result.Message);
            }
            catch (Exception ex)
            {
                return ServiceResult<VehicleAdminViewModel>.Factory.Fail(ex.Message);
            }
           
        }

        private void UpdateDescriptions(int id, List<VehicleDescriptionViewModel> descriptions)
        {
            var existingDescriptions = _vehicleDescriptionRepository.GetAllVehicleDescriptions(id);

            if (existingDescriptions.Any())
            {
                foreach (var existingDescription in existingDescriptions)
                {
                    bool exists = descriptions.Any() && descriptions.Any(x => x.Id == existingDescription.Id);

                    if (!exists)
                    {
                        _vehicleDescriptionRepository.Delete(existingDescription.Id);
                    }
                }
            }

            if (!descriptions.Any()) return;

            foreach (var vehicleDescriptionViewModel in descriptions)
            {
                VehicleDescription description = new VehicleDescription
                {
                    Vehicle = new Vehicle { Id = id }
                };

                Mapper.Map(vehicleDescriptionViewModel, description);

                if (existingDescriptions.Any() &&
                    existingDescriptions.Any(x => x.Id == vehicleDescriptionViewModel.Id))
                {
                    _vehicleDescriptionRepository.Update(description.Id, description);
                }
                else
                {
                    _vehicleDescriptionRepository.Add(description);
                }
            }
        }

        private void UpdateFeatures(int vehicleId, List<FeatureAdminSelectViewModel> features, IList<VehicleFeature> existingFeatures = null)
        {
            if(existingFeatures == null)
                existingFeatures = _vehicleFeatureRepository.GetAllBy(vehicleId);

            if (existingFeatures.Any())
            {
                foreach (var existingFeature in existingFeatures)
                {
                    bool exists = features.Any() && features.Any(
                        x => x.Value == existingFeature.Feature.Id.ToString() &&
                        existingFeature.Vehicle.Id == vehicleId);

                    if (!exists)
                    {
                        _vehicleFeatureRepository.Delete(existingFeature.Id);
                    }
                }
            }

            if (!features.Any()) return;

            foreach (var vehicleFeature in features)
            {
                VehicleFeature newFeature = new VehicleFeature
                {
                    Vehicle = new Vehicle { Id = vehicleId},
                    Feature = new Feature { Id = int.Parse(vehicleFeature.Value)}
                };

                bool exists = existingFeatures.Any() &&
                    existingFeatures.Any(x => 
                        x.Feature.Id == newFeature.Feature.Id && 
                        x.Vehicle.Id == newFeature.Vehicle.Id);

                if (!exists)
                {
                    _vehicleFeatureRepository.Add(newFeature);
                }
            }
        }

        public ServiceResult<VehicleAdminViewModel> Update(int id, VehicleAdminViewModel viewModel)
        {
            VehicleValidator validator = new VehicleValidator();
            ValidationResult results = validator.Validate(viewModel);

            if (!results.IsValid)
            {
                return ServiceResult<VehicleAdminViewModel>.Factory.Fail(results.Errors);
            }

            Vehicle entity = _vehicleRepository.GetDetailed(viewModel.Id);
            Mapper.Map(viewModel, entity);
            VehicleModel vehicleModel = _vehicleModelRepository.Get(viewModel.VehicleModel.Id);
            entity.VehicleModel = vehicleModel;

            var mainImage = _blobStorageService.HandleMedia(viewModel.MainImage, entity.MainImage);
            entity.MainImage = mainImage as Image;         

            UpdateDescriptions(entity.Id, viewModel.Descriptions);
            UpdateFeatures(entity.Id, viewModel.FeaturesAdminSelect, entity.Features);

            //if (viewModel.Images != null && viewModel.Images.Any())
            //{
            //    foreach (var imageContainerViewModel in viewModel.Images)
            //    {

            //        var image = _blobStorageService.HandleMedia(imageContainerViewModel, null);                    
            //    }
            //}

            var result = _vehicleRepository.Update(id, entity);

            VehicleAdminViewModel mappedResult = Mapper.Map<VehicleAdminViewModel>(result.ContextObject);

            return ServiceResult<VehicleAdminViewModel>.Factory.Success(mappedResult, result.Message);
        }

        public ServiceResult<bool> Delete(int id)
        {
            bool result = _vehicleRepository.Delete(id);
            return ServiceResult<bool>.Factory.Success(result);
        }

        public ServiceResult<IList<VehicleDetailedViewModel>> Search(SearchRequestViewModel parameters)
        {
            var results = _vehicleRepository.Search(parameters);
            IList<VehicleDetailedViewModel> mappedResult = Mapper.Map<IList<Vehicle>, IList<VehicleDetailedViewModel>> (results);
            return ServiceResult<IList<VehicleDetailedViewModel>>.Factory.Success(mappedResult);
        }
    }
}