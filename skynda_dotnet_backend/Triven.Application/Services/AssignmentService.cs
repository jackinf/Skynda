using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using X3Project.Application.Results;
using X3Project.Data.EntityFramework.Models.Assignmnet;
using X3Project.Domain.Repositories.Assignment;
using X3Project.Domain.Services;
using X3Project.Domain.ViewModelInterfaces;

namespace X3Project.Application.Services
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
