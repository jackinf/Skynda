using System;
using System.Collections.Generic;
using AutoMapper;
using Triven.Data.EntityFramework.Entities;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Classification;

namespace Triven.Application.Services
{
    public class ClassificationService : IClassificationService
    {
        private readonly IClassificationRepository<Classification> _classificationRepository;

        public ClassificationService()
        {
            _classificationRepository = IoC.Get<IClassificationRepository<Classification>>();
        }

        public ServiceResult<IList<ClassificationViewModel>> GetByType(string type)
        {
            try
            {
                var results = _classificationRepository.GetByType(type);
                IList<ClassificationViewModel> mappedResults = Mapper.Map<IList<ClassificationViewModel>>(results);
                return ServiceResult<IList<ClassificationViewModel>>.Factory.Success(mappedResults);
            }
            catch (Exception ex)
            {
                throw;
            }
            
        }

        public ServiceResult<IList<ClassificationViewModel>> GetByTypeAndVehicleBound(string type)
        {
            var results = _classificationRepository.GetByTypeAndVehicleBound(type);
            IList<ClassificationViewModel> mappedResults = Mapper.Map<IList<ClassificationViewModel>>(results);
            return ServiceResult<IList<ClassificationViewModel>>.Factory.Success(mappedResults);
        }
    }
}