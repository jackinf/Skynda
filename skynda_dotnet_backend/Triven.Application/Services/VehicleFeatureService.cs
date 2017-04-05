using System.Collections.Generic;
using AutoMapper;
using Triven.Data.EntityFramework.Entities;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Services
{
    public class VehicleFeatureService : IVehicleFeatureService
    {
        private readonly IVehicleFeatureRepository<VehicleFeature> _vehicleFeatureRepository;

        public VehicleFeatureService()
        {
            _vehicleFeatureRepository = IoC.Get<IVehicleFeatureRepository<VehicleFeature>>();
        }

        public ServiceResult<IList<VehicleFeatureViewModel>> GetAllBy(int vehicleId)
        {
            var result = _vehicleFeatureRepository.GetAllBy(vehicleId);
            IList<VehicleFeatureViewModel> mappedResults = Mapper.Map<IList<VehicleFeature>, IList<VehicleFeatureViewModel>>(result);
            return ServiceResult<IList<VehicleFeatureViewModel>>.Factory.Success(mappedResults);
        }

        public ServiceResult<bool> Delete(int id) => ServiceResult<bool>.Factory.Success(_vehicleFeatureRepository.Delete(id));
    }
}