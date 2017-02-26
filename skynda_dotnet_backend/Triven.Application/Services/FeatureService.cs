using System;
using AutoMapper;
using Triven.Application.Results;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Feature;

namespace Triven.Application.Services
{
    public class FeatureService : IFeatureService<ServiceResult>
    {
        private readonly IFeatureRepository<Feature> _featureRepository;

        public FeatureService()
        {
            _featureRepository = IoC.Get<IFeatureRepository<Feature>>();
        }

        public ServiceResult GetAll()
        {
            var result = _featureRepository.GetAll();
            return ServiceResult.Factory.Success(result);
        }

        public ServiceResult GetAllForAdminSelect()
        {
            throw new NotImplementedException("What is this method for?");    // TODO: implement or remove.
        }

        public ServiceResult Get(int id)
        {
            var result = _featureRepository.Get(id);
            return ServiceResult.Factory.Success(result);
        }

        public ServiceResult Create(FeatureViewModel dto)
        {
            var feature = Mapper.Map<FeatureViewModel, Feature>(dto);
            var result = _featureRepository.Add(feature);
            return ServiceResult.Factory.Success(result);
        }

        public ServiceResult Update(int id, FeatureViewModel dto)
        {
            var feature = _featureRepository.Get(id);
            Mapper.Map(dto, feature);
            var result = _featureRepository.Add(feature);
            return ServiceResult.Factory.Success(result);
        }

        public ServiceResult Delete(int id)
        {
            var result = _featureRepository.Delete(id);
            return ServiceResult.Factory.Success(result);
        }

        public ServiceResult GetAllBy(int vehicleId)
        {
            throw new NotImplementedException("What is this method for?");    // TODO: implement or remove.
        }
    }
}