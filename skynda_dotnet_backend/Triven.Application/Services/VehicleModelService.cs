using System;
using System.Collections.Generic;
using AutoMapper;
using Triven.Application.Validators.VehicleModel;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Application.Services
{
    public class VehicleModelService : IVehicleModelService
    {
        private readonly IVehicleModelRepository<VehicleModel> _vehicleModelRepository;

        public VehicleModelService()
        {
            _vehicleModelRepository = IoC.Get<IVehicleModelRepository<VehicleModel>>();
        }

        public ServiceResult<IEnumerable<VehicleModelViewModel>> GetAll()
        {
            var results = _vehicleModelRepository.GetAll();
            IEnumerable<VehicleModelViewModel> mappedResults = Mapper.Map<IEnumerable<VehicleModel>, IEnumerable<VehicleModelViewModel>>(results);
            return ServiceResult<IEnumerable<VehicleModelViewModel>>.Factory.Success(mappedResults);
        }

        public ServiceResult<VehicleModelViewModel> Get(int id)
        {
            var result = _vehicleModelRepository.GetFullVehicleModel(id);
            VehicleModelViewModel mappedResult = Mapper.Map<VehicleModel, VehicleModelViewModel>(result);
            return ServiceResult<VehicleModelViewModel>.Factory.Success(mappedResult);
        }

        public ServiceResult<VehicleModelViewModel> Create(VehicleModelViewModel viewModel)
        {
            try
            {
                if(viewModel == null)
                    viewModel = new VehicleModelViewModel();

                VehicleModelValidator validator = new VehicleModelValidator();
                var validation = validator.Validate(viewModel);

                if (!validation.IsValid)
                {
                    return ServiceResult<VehicleModelViewModel>.Factory.Fail(validation.Errors);
                }

                var entity = Mapper.Map<VehicleModel>(viewModel);
                var result = _vehicleModelRepository.Add(entity);
                VehicleModelViewModel mappedViewModel = Mapper.Map<VehicleModelViewModel>(result.ContextObject);

                return ServiceResult<VehicleModelViewModel>.Factory.Success(mappedViewModel, result.Message);
            }
            catch (Exception ex)
            {
                return ServiceResult<VehicleModelViewModel>.Factory.Fail(ex);
            }
            
        }

        public ServiceResult<VehicleModelViewModel> Update(int id, VehicleModelViewModel viewModel)
        {
            try
            {
                VehicleModelValidator validator = new VehicleModelValidator();
                var validation = validator.Validate(viewModel);

                if (!validation.IsValid)
                {
                    return ServiceResult<VehicleModelViewModel>.Factory.Fail(validation.Errors);
                }

                var entity = _vehicleModelRepository.Get(id);
                Mapper.Map(viewModel, entity);
                var result = _vehicleModelRepository.Update(id, entity);
                VehicleModelViewModel mappedResult = Mapper.Map<VehicleModelViewModel>(result.ContextObject);

                return ServiceResult<VehicleModelViewModel>.Factory.Success(mappedResult, result.Message);
            }
            catch (Exception ex)
            {
                return ServiceResult<VehicleModelViewModel>.Factory.Fail(ex);
            }

        }

        public ServiceResult<bool> Delete(int id)
        {
            try
            {
                bool result = _vehicleModelRepository.Delete(id);
                return ServiceResult<bool>.Factory.Success(result);
            }
            catch (Exception ex)
            {
                return ServiceResult<bool>.Factory.Fail(ex);
            }
            
        }

        public ServiceResult<IList<VehicleModelViewModel>> Search(VehicleModelSearchRequestViewModel viewModel)
        {
            var results = _vehicleModelRepository.Search(viewModel);
            IList<VehicleModelViewModel> mappedResults = Mapper.Map<IList<VehicleModel>, IList<VehicleModelViewModel>>(results);
            return ServiceResult<IList<VehicleModelViewModel>>.Factory.Success(mappedResults);
        }
    }
}