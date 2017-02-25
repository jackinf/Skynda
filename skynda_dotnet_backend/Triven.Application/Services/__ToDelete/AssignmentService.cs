using System;
using System.Collections.Generic;
using AutoMapper;
using Triven.Application.Results;
using Triven.Domain.Repositories.Assignment;
using Triven.Domain.Services;
using Triven.Domain.ViewModelInterfaces;

namespace Triven.Application.Services
{
    public class AssignmentService : IAssignmentService<ServiceResult>
    {

        private readonly IAssignmentRepository<AssignmentModel> _repository;

        public AssignmentService(IAssignmentRepository<AssignmentModel> repository)
        {
            _repository = repository;
        }

        public ServiceResult GetAll<TAssignmentViewModel>() where TAssignmentViewModel : IAssignmentViewModel
        {
            var entities = _repository.GetAll();
            var foundViewModels = Mapper.Map<IEnumerable<TAssignmentViewModel>>(entities);
            return ServiceResult.Factory.Success(foundViewModels);
        }

        public ServiceResult Get<TAssignmentViewModel>(int id) where TAssignmentViewModel : IAssignmentViewModel
        {
            var entity = _repository.Get(id);
            if (entity == null)
                ServiceResult.Factory.Fail(new List<string> { "Assignment not found" });
            var foundViewModel = Mapper.Map<TAssignmentViewModel>(entity);
            return ServiceResult.Factory.Success(foundViewModel);
        }

        public ServiceResult AcceptDeclineAssignment<TAssignmentViewModel>() where TAssignmentViewModel : IAssignmentViewModel
        {
            throw new NotImplementedException();
        }
    }
}
