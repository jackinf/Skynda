using System;
using System.Collections.Generic;
using AutoMapper;
using Triven.Application.Results;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Classification;

namespace Triven.Application.Services
{
    public class ClassificationService : IClassificationService<ServiceResult>
    {
        private readonly IClassificationRepository<Classification> _classificationRepository;

        public ClassificationService()
        {
            _classificationRepository = IoC.Get<IClassificationRepository<Classification>>();
        }

        public ServiceResult GetByType(string type)
        {
            try
            {
                var results = _classificationRepository.GetByType(type);
                var mappedResults = Mapper.Map<IList<ClassificationViewModel>>(results);
                return ServiceResult.Factory.Success(mappedResults);
            }
            catch (Exception ex)
            {
                throw;
            }
            
        }

        public ServiceResult GetByTypeAndVehicleBound(string type)
        {
            var results = _classificationRepository.GetByTypeAndVehicleBound(type);
            var mappedResults = Mapper.Map<IList<ClassificationViewModel>>(results);
            return ServiceResult.Factory.Success(mappedResults);
        }
    }
}