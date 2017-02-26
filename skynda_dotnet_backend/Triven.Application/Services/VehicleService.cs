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
    public class VehicleService : IVehicleService<ServiceResult>
    {
        private readonly IVehicleRepository<Vehicle> _VehicleRepository;

        public VehicleService()
        {
            _VehicleRepository = IoC.Get<IVehicleRepository<Vehicle>>();
        }

        public ServiceResult GetAll()
        {
            var results = _VehicleRepository.GetAll();
            var mappedResults = Mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleDetailedViewModel>>(results);
            return ServiceResult.Factory.Success(mappedResults);
        }

        public ServiceResult Get(int id)
        {
            var result = _VehicleRepository.Get(id);
            var mappedResult = Mapper.Map<Vehicle, VehicleAdminViewModel>(result);
            return ServiceResult.Factory.Success(mappedResult);
        }

        public ServiceResult GetDetailed(int id)
        {
            var result = _VehicleRepository.Get(id);
            var mappedResult = Mapper.Map<Vehicle, VehicleDetailedViewModel>(result);
            return ServiceResult.Factory.Success(mappedResult);
        }

        public ServiceResult Create(VehicleAdminViewModel viewModel)
        {
            var entity = Mapper.Map<Vehicle>(viewModel);
            var result = _VehicleRepository.Add(entity);
            return ServiceResult.Factory.Success(result, result.Message);
        }

        public ServiceResult Update(int id, VehicleAdminViewModel viewModel)
        {
            var entity = _VehicleRepository.Get(id);
            Mapper.Map(viewModel, entity);
            var result = _VehicleRepository.Add(entity);
            return ServiceResult.Factory.Success(result, result.Message);
        }

        public ServiceResult Delete(int id)
        {
            var result = _VehicleRepository.Delete(id);
            return ServiceResult.Factory.Success(result);
        }

        public ServiceResult Search(SearchRequestViewModel parameters)
        {
            var results = _VehicleRepository.Search(parameters);
            var mappedResult = Mapper.Map<IList<Vehicle>, IList<VehicleDetailedViewModel>> (results);
            return ServiceResult.Factory.Success(mappedResult);
        }
    }
}