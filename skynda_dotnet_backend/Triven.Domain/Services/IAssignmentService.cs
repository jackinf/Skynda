using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Results;
using X3Project.Domain.ViewModelInterfaces;

namespace X3Project.Domain.Services
{
    public interface IAssignmentService<out TServiceResult> where TServiceResult : IServiceResult
    {

        /// <summary>
        /// Get all assignments
        /// </summary>
        /// <typeparam name="TAssignmentViewModel"></typeparam>
        /// <returns></returns>
        TServiceResult GetAll<TAssignmentViewModel>() where TAssignmentViewModel : IAssignmentViewModel;

        /// <summary>
        /// Get assignment info
        /// </summary>
        /// <typeparam name="TAssignmentViewModel"></typeparam>
        /// <param name="id"></param>
        /// <returns></returns>
        TServiceResult Get<TAssignmentViewModel>(int id) where TAssignmentViewModel : IAssignmentViewModel;


        /// <summary>
        /// Accept or decline assignment
        /// </summary>
        /// <typeparam name="TAssignmentViewModel"></typeparam>
        /// <returns></returns>
        TServiceResult AcceptDeclineAssignment<TAssignmentViewModel>() where TAssignmentViewModel : IAssignmentViewModel;
    }
}
