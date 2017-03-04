using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FluentValidation.Results;
using Triven.Application.Validators.Vehicle;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Application.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository<Vehicle> _vehicleRepository;
        private readonly IVehicleModelRepository<VehicleModel> _vehicleModelRepository;
        private readonly IBlobStorageService _blobStorageService;

        public VehicleService()
        {
            _vehicleRepository = IoC.Get<IVehicleRepository<Vehicle>>();
            _vehicleModelRepository = IoC.Get<IVehicleModelRepository<VehicleModel>>();

            _blobStorageService = IoC.Get<IBlobStorageService>();
        }

        public ServiceResult<IEnumerable<VehicleDetailedViewModel>> GetAll()
        {
            var results = _vehicleRepository.GetAll();
            IEnumerable<VehicleDetailedViewModel> mappedResults = Mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleDetailedViewModel>>(results);
            return ServiceResult<IEnumerable<VehicleDetailedViewModel>>.Factory.Success(mappedResults);
        }

        public ServiceResult<VehicleAdminViewModel> Get(int id)
        {
            var result = _vehicleRepository.Get(id);
            VehicleAdminViewModel mappedResult = Mapper.Map<Vehicle, VehicleAdminViewModel>(result);
            return ServiceResult<VehicleAdminViewModel>.Factory.Success(mappedResult);
        }

        public ServiceResult<VehicleDetailedViewModel> GetDetailed(int id)
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

                if (viewModel.Id != 0)
                {
                    entity = _vehicleRepository.Get(viewModel.Id);
                    entity.UpdatedOn = DateTime.Now;
                }
                else
                {
                    entity.CreatedOn = DateTime.Now;
                }

                VehicleModel vehicleModel = _vehicleModelRepository.Get(viewModel.Model.Id);
                entity.VehicleModel = vehicleModel;


                if (viewModel.MainImage != null)
                {
                    var mainImage = _blobStorageService.HandleMedia(viewModel.MainImage, null);
                    entity.MainImage = mainImage as Image;
                }

                //var descriptionEntities = Mapper.Map<List<IVehicleDescription>>(viewModel.Descriptions);
                //entity.Descriptions = descriptionEntities;

                //var imageEntities = Mapper.Map<List<VehicleImage>>(viewModel.Images);
                //entity.Images = imageEntities;
                //foreach (var imageEntity in imageEntities)
                //{
                //    // todo: handle image uplaod to blob stoarge
                //}

                var result = _vehicleRepository.Add(entity);
                VehicleAdminViewModel mappedResult = Mapper.Map<VehicleAdminViewModel>(result.ContextObject);
                return ServiceResult<VehicleAdminViewModel>.Factory.Success(mappedResult, result.Message);
            }
            catch (Exception e)
            {
                return ServiceResult<VehicleAdminViewModel>.Factory.Fail(new ValidationResult());
            }
           
        }

        public ServiceResult<VehicleAdminViewModel> Update(int id, VehicleAdminViewModel viewModel)
        {
            var entity = _vehicleRepository.GetIncluding(id, descriptions: true, images: true);
            Mapper.Map(viewModel, entity);

            if (viewModel.MainImage != null)
            {
                // todo: handle upload of main image
            }

            var newDescriptionEntities = Mapper.Map<List<IVehicleDescription>>(viewModel.Descriptions);
            var toDeleteDescriptionIds = entity.Descriptions.Select(x => x.Id).Where(descriptionId => newDescriptionEntities.All(xx => xx.Id != descriptionId)).ToList();
            //entity.Descriptions = newDescriptionEntities;

            var newImageEntities = Mapper.Map<List<IVehicleImage>>(viewModel.Images);
            var toDeleteImageIds = entity.Images.Select(x => x.Id).Where(imageId => newImageEntities.All(xx => xx.Id != imageId)).ToList();
            //entity.Images = newImageEntities;
            foreach (var newImageEntity in newImageEntities)
            {
                // todo: handle image uplaod to blob stoarge
            }

            var result = _vehicleRepository.Update(id, entity, toDeleteDescriptionIds, toDeleteImageIds);
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