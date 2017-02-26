using System.Collections.Generic;
using AutoMapper;
using Triven.Application.Results;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Services
{
    public class VehicleReportService : IVehicleReportService<ServiceResult>
    {
        private readonly IVehicleReportRepository<VehicleReport> _vehicleReportRepository;

        public VehicleReportService()
        {
            _vehicleReportRepository = IoC.Get<IVehicleReportRepository<VehicleReport>>();
        }

        public ServiceResult GetAll()
        {
            var results = _vehicleReportRepository.GetAll();
            var mappedResults = Mapper.Map<IEnumerable<VehicleReport>, IEnumerable<VehicleReportViewModel>>(results);
            return ServiceResult.Factory.Success(mappedResults);
        }

        public ServiceResult Get(int id)
        {
            var result = _vehicleReportRepository.Get(id);
            var mappedResult = Mapper.Map<VehicleReport, VehicleReportViewModel>(result);
            return ServiceResult.Factory.Success(mappedResult);
        }

        public ServiceResult Create(VehicleReportViewModel viewModel)
        {
            var entity = Mapper.Map<VehicleReport>(viewModel);
            var result = _vehicleReportRepository.Add(entity);
            return ServiceResult.Factory.Success(result, result.Message);
        }

        public ServiceResult Update(int id, VehicleReportViewModel viewModel)
        {
            var entity = _vehicleReportRepository.Get(id);
            Mapper.Map(viewModel, entity);
            var result = _vehicleReportRepository.Add(entity);
            return ServiceResult.Factory.Success(result, result.Message);
        }

        public ServiceResult Delete(int id)
        {
            var result = _vehicleReportRepository.Delete(id);
            return ServiceResult.Factory.Success(result);
        }

        public ServiceResult GetAllBy(int vehicleId)
        {
            var results = _vehicleReportRepository.GetAllBy(vehicleId);
            var mappedResults = Mapper.Map<IList<VehicleReport>, IList<VehicleReportViewModel>>(results);
            return ServiceResult.Factory.Success(mappedResults);
        }
    }
}