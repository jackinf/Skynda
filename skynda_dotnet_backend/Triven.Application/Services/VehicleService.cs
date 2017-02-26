using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Triven.Application.Results;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Application.Services
{
    public class VehicleService : IVehicleService<ServiceResult>
    {
        private readonly IVehicleRepository<Vehicle> _vehicleRepository;

        public VehicleService()
        {
            _vehicleRepository = IoC.Get<IVehicleRepository<Vehicle>>();
        }

        public ServiceResult GetAll()
        {
            var results = _vehicleRepository.GetAll();
            var mappedResults = Mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleDetailedViewModel>>(results);
            return ServiceResult.Factory.Success(mappedResults);
        }

        public ServiceResult Get(int id)
        {
            var result = _vehicleRepository.Get(id);
            var mappedResult = Mapper.Map<Vehicle, VehicleAdminViewModel>(result);
            return ServiceResult.Factory.Success(mappedResult);
        }

        public ServiceResult GetDetailed(int id)
        {
            var result = _vehicleRepository.Get(id);
            var mappedResult = Mapper.Map<Vehicle, VehicleDetailedViewModel>(result);
            return ServiceResult.Factory.Success(mappedResult);
        }

        public ServiceResult Create(VehicleAdminViewModel viewModel)
        {
            var entity = Mapper.Map<Vehicle>(viewModel);

            if (viewModel.MainImage != null)
            {
                // todo: handle upload of main image
            }

            var descriptionEntities = Mapper.Map<List<VehicleDescription>>(viewModel.Descriptions);
            entity.Descriptions = descriptionEntities;

            var imageEntities = Mapper.Map<List<VehicleImage>>(viewModel.Images);
            entity.Images = imageEntities;
            foreach (var imageEntity in imageEntities)
            {
                // todo: handle image uplaod to blob stoarge
            }

            var result = _vehicleRepository.Add(entity);
            var mappedResult = Mapper.Map<VehicleAdminViewModel>(result.ContextObject);
            return ServiceResult.Factory.Success(mappedResult, result.Message);
        }

        public ServiceResult Update(int id, VehicleAdminViewModel viewModel)
        {
            var entity = _vehicleRepository.GetIncluding(id, descriptions: true, images: true);
            Mapper.Map(viewModel, entity);

            if (viewModel.MainImage != null)
            {
                // todo: handle upload of main image
            }

            var newDescriptionEntities = Mapper.Map<List<VehicleDescription>>(viewModel.Descriptions);
            var toDeleteDescriptionIds = entity.Descriptions.Select(x => x.Id).Where(descriptionId => newDescriptionEntities.All(xx => xx.Id != descriptionId)).ToList();
            entity.Descriptions = newDescriptionEntities;

            var newImageEntities = Mapper.Map<List<VehicleImage>>(viewModel.Images);
            var toDeleteImageIds = entity.Images.Select(x => x.Id).Where(imageId => newImageEntities.All(xx => xx.Id != imageId)).ToList();
            entity.Images = newImageEntities;
            foreach (var newImageEntity in newImageEntities)
            {
                // todo: handle image uplaod to blob stoarge
            }

            var result = _vehicleRepository.Update(id, entity, toDeleteDescriptionIds, toDeleteImageIds);
            var mappedResult = Mapper.Map<VehicleAdminViewModel>(result.ContextObject);
            return ServiceResult.Factory.Success(mappedResult, result.Message);
        }

        public ServiceResult Delete(int id)
        {
            var result = _vehicleRepository.Delete(id);
            return ServiceResult.Factory.Success(result);
        }

        public ServiceResult Search(SearchRequestViewModel parameters)
        {
            var results = _vehicleRepository.Search(parameters);
            var mappedResult = Mapper.Map<IList<Vehicle>, IList<VehicleDetailedViewModel>> (results);
            return ServiceResult.Factory.Success(mappedResult);
        }
    }
}