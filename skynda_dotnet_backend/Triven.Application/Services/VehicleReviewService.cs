using System.Collections.Generic;
using AutoMapper;
using Triven.Application.Results;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Services
{
    public class VehicleReviewService : IVehicleReviewService<ServiceResult>
    {
        private readonly IVehicleReviewRepository<VehicleReview> _VehicleReviewRepository;

        public VehicleReviewService()
        {
            _VehicleReviewRepository = IoC.Get<IVehicleReviewRepository<VehicleReview>>();
        }

        public ServiceResult GetAll()
        {
            var results = _VehicleReviewRepository.GetAll();
            var mappedResults = Mapper.Map<IEnumerable<VehicleReview>, IEnumerable<VehicleReviewViewModel>>(results);
            return ServiceResult.Factory.Success(mappedResults);
        }

        public ServiceResult Get(int id)
        {
            var result = _VehicleReviewRepository.Get(id);
            var mappedResult = Mapper.Map<VehicleReview, VehicleReviewViewModel>(result);
            return ServiceResult.Factory.Success(mappedResult);
        }

        public ServiceResult Create(VehicleReviewViewModel viewModel)
        {
            var entity = Mapper.Map<VehicleReview>(viewModel);
            var result = _VehicleReviewRepository.Add(entity);
            return ServiceResult.Factory.Success(result, result.Message);
        }

        public ServiceResult Update(int id, VehicleReviewViewModel viewModel)
        {
            var entity = _VehicleReviewRepository.Get(id);
            Mapper.Map(viewModel, entity);
            var result = _VehicleReviewRepository.Add(entity);
            return ServiceResult.Factory.Success(result, result.Message);
        }

        public ServiceResult Delete(int id)
        {
            var result = _VehicleReviewRepository.Delete(id);
            return ServiceResult.Factory.Success(result);
        }

        public ServiceResult GetAllBy(int vehicleId)
        {
            var results = _VehicleReviewRepository.GetAllBy(vehicleId);
            var mappedResults = Mapper.Map<IList<VehicleReview>, IList<VehicleReviewViewModel>>(results);
            return ServiceResult.Factory.Success(mappedResults);
        }
    }
}