using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FluentValidation.Results;
using Triven.Application.Results;
using Triven.Application.Validators.Feature;
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
            try
            {
                var results = _featureRepository.GetAll().ToList();
                var mappedResults = Mapper.Map<IList<FeatureViewModel>>(results);
                return ServiceResult.Factory.Success(mappedResults);
            }
            catch (Exception ex)
            {
                return ServiceResult.Factory.Fail(new ValidationResult());
            }
            
        }

        public ServiceResult GetAllForAdminSelect()
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

            return ServiceResult.Factory.Success(adminSelectFeatures);
        }

        public ServiceResult Get(int id)
        {
            var result = _featureRepository.Get(id);
            var mappedResult = Mapper.Map<FeatureViewModel>(result);
            return ServiceResult.Factory.Success(mappedResult);
        }

        public ServiceResult Create(FeatureViewModel viewModel)
        {
            var feature = Mapper.Map<FeatureViewModel, Feature>(viewModel);
            var result = _featureRepository.Add(feature);
            var mappedResult = Mapper.Map<FeatureViewModel>(result.ContextObject);
            return ServiceResult.Factory.Success(mappedResult);
        }

        public ServiceResult Update(int id, FeatureViewModel viewModel)
        {
            FeatureValidator validator =new FeatureValidator();
            var validationResult = validator.Validate(viewModel);

            if (!validationResult.IsValid)
                return ServiceResult.Factory.Fail(validationResult.Errors);

            var feature = _featureRepository.Get(id);
            Mapper.Map(viewModel, feature);
            var result = _featureRepository.Update(id, feature);
            var mappedResult = Mapper.Map<FeatureViewModel>(result.ContextObject);

            return ServiceResult.Factory.Success(mappedResult);
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