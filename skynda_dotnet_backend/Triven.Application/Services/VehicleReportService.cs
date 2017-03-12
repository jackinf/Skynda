using System.Collections.Generic;
using AutoMapper;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Services
{
    public class VehicleReportService : IVehicleReportService
    {
        private readonly IVehicleReportRepository<VehicleReport> _vehicleReportRepository;

        public VehicleReportService()
        {
            _vehicleReportRepository = IoC.Get<IVehicleReportRepository<VehicleReport>>();
        }

        public ServiceResult<IEnumerable<VehicleReportViewModel>> GetAll()
        {
            var results = _vehicleReportRepository.GetAll();
            IEnumerable<VehicleReportViewModel> mappedResults = Mapper.Map<IEnumerable<VehicleReport>, IEnumerable<VehicleReportViewModel>>(results);
            return ServiceResult<IEnumerable<VehicleReportViewModel>>.Factory.Success(mappedResults);
        }

        public ServiceResult<VehicleReportViewModel> Get(int id)
        {
            var result = _vehicleReportRepository.Get(id);
            VehicleReportViewModel mappedResult = Mapper.Map<VehicleReport, VehicleReportViewModel>(result);
            return ServiceResult<VehicleReportViewModel>.Factory.Success(mappedResult);
        }

        public ServiceResult<VehicleReportViewModel> Create(int vehicleId, VehicleReportViewModel viewModel)
        {
            var entity = Mapper.Map<VehicleReport>(viewModel);
            var result = _vehicleReportRepository.Add(vehicleId, entity);
            VehicleReportViewModel mappedResult = Mapper.Map<VehicleReportViewModel>(result.ContextObject);
            return ServiceResult<VehicleReportViewModel>.Factory.Success(mappedResult, result.Message);
        }

        public ServiceResult<VehicleReportViewModel> Update(int vehicleId, int id, VehicleReportViewModel viewModel)
        {
            var entity = _vehicleReportRepository.Get(id);
            Mapper.Map(viewModel, entity);
            var result = _vehicleReportRepository.Update(vehicleId, id, entity);
            VehicleReportViewModel mappedResult = Mapper.Map<VehicleReportViewModel>(result.ContextObject);
            return ServiceResult<VehicleReportViewModel>.Factory.Success(mappedResult, result.Message);
        }

        public ServiceResult<bool> Delete(int id)
        {
            bool result = _vehicleReportRepository.Delete(id);
            return ServiceResult<bool>.Factory.Success(result);
        }

        public ServiceResult<IList<VehicleReportViewModel>> GetAllBy(int vehicleId)
        {
            var results = _vehicleReportRepository.GetAllBy(vehicleId);
            IList<VehicleReportViewModel> mappedResults = Mapper.Map<IList<VehicleReport>, IList<VehicleReportViewModel>>(results);
            return ServiceResult<IList<VehicleReportViewModel>>.Factory.Success(mappedResults);
        }
    }
}