using System.Collections.Generic;
using AutoMapper;
using Triven.Application.Results;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Application.Services
{
    public class VehicleModelService : IVehicleModelService<ServiceResult>
    {
        private readonly IVehicleModelRepository<VehicleModel> _vehicleModelRepository;

        public VehicleModelService()
        {
            _vehicleModelRepository = IoC.Get<IVehicleModelRepository<VehicleModel>>();
        }

        public ServiceResult GetAll()
        {
            var results = _vehicleModelRepository.GetAll();
            var mappedResults = Mapper.Map<IEnumerable<VehicleModel>, IEnumerable<VehicleModelViewModel>>(results);
            return ServiceResult.Factory.Success(mappedResults);
        }

        public ServiceResult Get(int id)
        {
            var result = _vehicleModelRepository.Get(id);
            var mappedResult = Mapper.Map<VehicleModel, VehicleModelViewModel>(result);
            return ServiceResult.Factory.Success(mappedResult);
        }

        public ServiceResult Create(VehicleModelViewModel viewModel)
        {
            var entity = Mapper.Map<VehicleModel>(viewModel);
            var result = _vehicleModelRepository.Add(entity);
            return ServiceResult.Factory.Success(result, result.Message);
        }

        public ServiceResult Update(int id, VehicleModelViewModel viewModel)
        {
            var entity = _vehicleModelRepository.Get(id);
            Mapper.Map(viewModel, entity);
            var result = _vehicleModelRepository.Add(entity);
            return ServiceResult.Factory.Success(result, result.Message);
        }

        public ServiceResult Delete(int id)
        {
            var result = _vehicleModelRepository.Delete(id);
            return ServiceResult.Factory.Success(result);
        }

        public ServiceResult Search(VehicleModelSearchRequestViewModel viewModel)
        {
            var results = _vehicleModelRepository.Search(viewModel);
            var mappedResults = Mapper.Map<IList<VehicleModel>, IList<VehicleModelViewModel>>(results);
            return ServiceResult.Factory.Success(mappedResults);
        }
    }
}