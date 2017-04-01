using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly IBlobStorageService _blobStorageService;
        private readonly IVehicleFaultRepository<VehicleFault> _vehicleFaultRepository;

        public VehicleReportService()
        {
            _vehicleReportRepository = IoC.Get<IVehicleReportRepository<VehicleReport>>();
            _blobStorageService = IoC.Get<IBlobStorageService>();
            _vehicleFaultRepository = IoC.Get<IVehicleFaultRepository<VehicleFault>>();
        }

        public ServiceResult<IEnumerable<VehicleReportViewModel>> GetAll()
        {
            var results = _vehicleReportRepository.GetAll();
            IEnumerable<VehicleReportViewModel> mappedResults = Mapper.Map<IEnumerable<VehicleReport>, IEnumerable<VehicleReportViewModel>>(results);
            return ServiceResult<IEnumerable<VehicleReportViewModel>>.Factory.Success(mappedResults);
        }

        public ServiceResult<VehicleReportViewModel> Get(int id)
        {
            var result = _vehicleReportRepository.GetFull(id);
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

            foreach (var vehicleFault in entity.Faults)
            {
                vehicleFault.Image = null;
            }

            var result = _vehicleReportRepository.Update(vehicleId, id, entity);

            UpdateFaults(entity, id, viewModel.Faults);

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

        private void UpdateFaults(VehicleReport entity, int reportId, IList<FaultBaseViewModel> faults)
        {
            if (entity.Id <= 0)
                throw new ArgumentException("Wrong id");

            var existingFaults = _vehicleFaultRepository.GetCategoryFaults(reportId);

            if (existingFaults.Any())
            {
                foreach (var existingFault in existingFaults)
                {
                    bool exists = faults.Any() && faults.Any(x => x.Id == existingFault.Id);

                    if (!exists)
                    {
                        _vehicleFaultRepository.Delete(existingFault.Id);
                    }
                }
            }

            if (!faults.Any()) return;

            foreach (var reportFault in faults)
            {
                var fault = new VehicleFault
                {
                    VehicleReportId = reportId
                };

                var imgViewModel = reportFault.Image;

                var exisingImage = existingFaults.FirstOrDefault(x => x.Id == reportFault.Id)?.Image;

                var updatedImage = _blobStorageService.HandleMedia(imgViewModel, exisingImage);

                fault.Image = updatedImage as Image;

                Mapper.Map(reportFault, fault);

                if (existingFaults.Any() &&
                    existingFaults.Any(x => x.Id == reportFault.Id))
                {
                    _vehicleFaultRepository.Update(fault.Id, fault);
                }
                else
                {
                    _vehicleFaultRepository.Add(fault);
                }
            }
        }
    }
}