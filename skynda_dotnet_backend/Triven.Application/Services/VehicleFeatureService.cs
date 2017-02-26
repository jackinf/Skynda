using System.Collections.Generic;
using AutoMapper;
using Triven.Application.Results;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Services
{
    public class VehicleFeatureService : IVehicleFeatureService<ServiceResult>
    {
        private readonly IVehicleFeatureRepository<VehicleFeature> _vehicleFeatureRepository;

        public VehicleFeatureService()
        {
            _vehicleFeatureRepository = IoC.Get<IVehicleFeatureRepository<VehicleFeature>>();
        }

        public ServiceResult GetAllBy(int vehicleId)
        {
            var result = _vehicleFeatureRepository.GetAllBy(vehicleId);
            var mappedResults = Mapper.Map<IList<VehicleFeature>, IList<VehicleFeatureViewModel>>(result);
            return ServiceResult.Factory.Success(mappedResults);
        }

        public ServiceResult Delete(int id)
        {
            var result = _vehicleFeatureRepository.Delete(id);
            return ServiceResult.Factory.Success(result);
        }
    }
}