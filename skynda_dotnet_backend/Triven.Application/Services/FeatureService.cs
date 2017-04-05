using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Triven.Application.Validators.Feature;
using Triven.Data.EntityFramework.Entities;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Feature;

namespace Triven.Application.Services
{
    public class FeatureService : IFeatureService
    {
        private readonly IFeatureRepository<Feature> _featureRepository;

        public FeatureService()
        {
            _featureRepository = IoC.Get<IFeatureRepository<Feature>>();
        }

        public ServiceResult<IList<FeatureViewModel>> GetAll()
        {
            try
            {
                var results = _featureRepository.GetAll().ToList();
                IList<FeatureViewModel> mappedResults = Mapper.Map<IList<FeatureViewModel>>(results);
                return ServiceResult<IList<FeatureViewModel>>.Factory.Success(mappedResults);
            }
            catch (Exception ex)
            {
                return ServiceResult<IList<FeatureViewModel>>.Factory.Fail(ex);
            }
            
        }

        public ServiceResult<List<FeatureAdminSelectViewModel>> GetAllForAdminSelect()
        {
            var results = _featureRepository.GetAll().ToList();
            List<FeatureAdminSelectViewModel> adminSelectFeatures = new List<FeatureAdminSelectViewModel>();

            if (results.Any())
            {
                foreach (var feature in results)
                {
                    adminSelectFeatures.Add(new FeatureAdminSelectViewModel
                    {
                        Value = feature.Id.ToString(),
                        Label = feature.Name
                    });
                }
            }

            return ServiceResult<List<FeatureAdminSelectViewModel>>.Factory.Success(adminSelectFeatures);
        }

        public ServiceResult<FeatureViewModel> Get(int id)
        {
            var result = _featureRepository.Get(id);
            FeatureViewModel mappedResult = Mapper.Map<FeatureViewModel>(result);
            return ServiceResult<FeatureViewModel>.Factory.Success(mappedResult);
        }

        public ServiceResult<FeatureViewModel> Create(FeatureViewModel viewModel)
        {
            var feature = Mapper.Map<FeatureViewModel, Feature>(viewModel);
            var result = _featureRepository.Add(feature);
            FeatureViewModel mappedResult = Mapper.Map<FeatureViewModel>(result.ContextObject);
            return ServiceResult<FeatureViewModel>.Factory.Success(mappedResult);
        }

        public ServiceResult<FeatureViewModel> Update(int id, FeatureViewModel viewModel)
        {
            FeatureValidator validator =new FeatureValidator();
            var validationResult = validator.Validate(viewModel);

            if (!validationResult.IsValid)
                return ServiceResult<FeatureViewModel>.Factory.Fail(validationResult.Errors);

            var feature = _featureRepository.Get(id);
            Mapper.Map(viewModel, feature);
            var result = _featureRepository.Update(id, feature);
            FeatureViewModel mappedResult = Mapper.Map<FeatureViewModel>(result.ContextObject);

            return ServiceResult<FeatureViewModel>.Factory.Success(mappedResult);
        }

        public ServiceResult<bool> Delete(int id)
        {
            bool result = _featureRepository.Delete(id);
            return ServiceResult<bool>.Factory.Success(result);
        }

        public ServiceResult<List<object>>  GetAllBy(int vehicleId)
        {
            throw new NotImplementedException("What is this method for?");    // TODO: implement or remove.
        }
    }
}