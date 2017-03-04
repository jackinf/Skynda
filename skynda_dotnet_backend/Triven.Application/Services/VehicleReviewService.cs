using System.Collections.Generic;
using AutoMapper;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Services
{
    public class VehicleReviewService : IVehicleReviewService
    {
        private readonly IVehicleReviewRepository<VehicleReview> _VehicleReviewRepository;

        public VehicleReviewService()
        {
            _VehicleReviewRepository = IoC.Get<IVehicleReviewRepository<VehicleReview>>();
        }

        public ServiceResult<IEnumerable<VehicleReviewViewModel>> GetAll()
        {
            var results = _VehicleReviewRepository.GetAll();
            IEnumerable<VehicleReviewViewModel> mappedResults = Mapper.Map<IEnumerable<VehicleReview>, IEnumerable<VehicleReviewViewModel>>(results);
            return ServiceResult<IEnumerable<VehicleReviewViewModel>>.Factory.Success(mappedResults);
        }

        public ServiceResult<VehicleReviewViewModel> Get(int id)
        {
            var result = _VehicleReviewRepository.Get(id);
            VehicleReviewViewModel mappedResult = Mapper.Map<VehicleReview, VehicleReviewViewModel>(result);
            return ServiceResult<VehicleReviewViewModel>.Factory.Success(mappedResult);
        }

        public ServiceResult<VehicleReviewViewModel> Create(VehicleReviewViewModel viewModel)
        {
            var entity = Mapper.Map<VehicleReview>(viewModel);
            var result = _VehicleReviewRepository.Add(entity);
            VehicleReviewViewModel mappedResult = Mapper.Map<VehicleReviewViewModel>(result.ContextObject);
            return ServiceResult<VehicleReviewViewModel>.Factory.Success(mappedResult, result.Message);
        }

        public ServiceResult<VehicleReviewViewModel> Update(int id, VehicleReviewViewModel viewModel)
        {
            var entity = _VehicleReviewRepository.Get(id);
            Mapper.Map(viewModel, entity);
            var result = _VehicleReviewRepository.Update(id, entity);
            VehicleReviewViewModel mappedResult = Mapper.Map<VehicleReviewViewModel>(result.ContextObject);
            return ServiceResult<VehicleReviewViewModel>.Factory.Success(mappedResult, result.Message);
        }

        public ServiceResult<bool> Delete(int id)
        {
            bool result = _VehicleReviewRepository.Delete(id);
            return ServiceResult<bool>.Factory.Success(result);
        }

        public ServiceResult<IList<VehicleReviewViewModel>> GetAllBy(int vehicleId)
        {
            var results = _VehicleReviewRepository.GetAllBy(vehicleId);
            IList<VehicleReviewViewModel> mappedResults = Mapper.Map<IList<VehicleReview>, IList<VehicleReviewViewModel>>(results);
            return ServiceResult<IList<VehicleReviewViewModel>>.Factory.Success(mappedResults);
        }
    }
}