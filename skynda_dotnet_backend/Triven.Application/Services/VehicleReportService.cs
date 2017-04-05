using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Triven.Data.EntityFramework.Entities;
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
        private readonly IVehicleReportItemRepository<VehicleReportItem> _vehicleReportItemRepository;

        public VehicleReportService()
        {
            _vehicleReportRepository = IoC.Get<IVehicleReportRepository<VehicleReport>>();
            _blobStorageService = IoC.Get<IBlobStorageService>();
            _vehicleFaultRepository = IoC.Get<IVehicleFaultRepository<VehicleFault>>();
            _vehicleReportItemRepository = IoC.Get<IVehicleReportItemRepository<VehicleReportItem>>();
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

            if (result.Faults.Any())
                result.Faults = result.Faults.Where(x => x.DeletedOn == null).ToList();

            if (result.Items.Any())
                result.Items = result.Items.Where(x => x.DeletedOn == null).ToList();

            VehicleReportViewModel mappedResult = Mapper.Map<VehicleReport, VehicleReportViewModel>(result);
            return ServiceResult<VehicleReportViewModel>.Factory.Success(mappedResult);
        }

        public ServiceResult<VehicleReportViewModel> Create(int vehicleId, VehicleReportViewModel viewModel)
        {
            var entity = Mapper.Map<VehicleReport>(viewModel);

            var result = _vehicleReportRepository.Add(vehicleId, entity);

            UpdateReportItems(result.ContextObject.Id, viewModel.Items);

            UpdateFaults(result.ContextObject.Id, viewModel.Faults);

            VehicleReportViewModel mappedResult = Mapper.Map<VehicleReportViewModel>(result.ContextObject);
            return ServiceResult<VehicleReportViewModel>.Factory.Success(mappedResult, result.Message);
        }

        public ServiceResult<VehicleReportViewModel> Update(int vehicleId, int id, VehicleReportViewModel viewModel)
        {
            if (vehicleId <= 0)
                throw new ArgumentException("Wrong id");

            var entity = _vehicleReportRepository.Get(id);

            Mapper.Map(viewModel, entity);

            foreach (var vehicleFault in entity.Faults)
            {
                vehicleFault.Image = null;
                vehicleFault.VehicleReportId = id;
            }

            foreach (var reportItem in entity.Items)
            {
                reportItem.Parent = null;
                reportItem.ParentId = id;
            }

            var result = _vehicleReportRepository.Update(vehicleId, id, entity);

            UpdateReportItems(id, viewModel.Items);

            UpdateFaults(id, viewModel.Faults);

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

        private void UpdateFaults(int reportId, IList<FaultBaseViewModel> faults)
        {
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
                    VehicleReportId = reportId,
                    Text = reportFault.Text,
                    Id = reportFault.Id
                };

                var imgViewModel = reportFault.Image;

                var exisingImage = existingFaults.FirstOrDefault(x => x.Id == reportFault.Id)?.Image;

                var updatedImage = _blobStorageService.HandleMedia(imgViewModel, exisingImage);

                if(updatedImage == null)
                    continue;
                
                fault.Image = updatedImage as Image;
                fault.ImageId = updatedImage.Id;

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

        private void UpdateReportItems(int reportId, IList<VehicleReportItemViewModel> reportItems)
        {
            var existingReportItems = _vehicleReportItemRepository.GetAllChildren(reportId);

            if (existingReportItems.Any())
            {
                foreach (var existingItem in existingReportItems)
                {
                    bool exists = reportItems.Any() && reportItems.Any(x => x.Id == existingItem.Id);

                    if (!exists)
                    {
                        _vehicleReportItemRepository.Delete(existingItem.Id);
                    }
                }
            }

            if (!reportItems.Any()) return;

            foreach (var reportItemViewModel in reportItems)
            {
                var item = Mapper.Map<VehicleReportItem>(reportItemViewModel);
                item.ParentId = reportId;
                item.Parent = null;

                if (existingReportItems.Any() &&
                    existingReportItems.Any(x => x.Id == reportItemViewModel.Id))
                {
                    _vehicleReportItemRepository.Update(item.Id, item);
                }
                else
                {
                    _vehicleReportItemRepository.Add(item);
                }
            }
        }
    }
}