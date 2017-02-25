using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using Triven.Application;
using Triven.Application.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Assignment;

namespace Triven.API.Controllers.__ToDelete
{
    [RoutePrefix("api/assignment")]
    public class AssignmentController : BaseController
    {
        private readonly IAssignmentService<ServiceResult> _service;

        public AssignmentController()
        {
            _service = IoC.Get<IAssignmentService<ServiceResult>>();
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin, Partner")]
        [HttpGet, Route("assignments"), ResponseType(typeof(List<AssignmentDisplayViewModel>))]
        public IHttpActionResult GetAssignments()
        {
            var result = _service.GetAll<AssignmentDisplayViewModel>();
            return result.IsSuccessful ? (IHttpActionResult)Ok(result) : BadRequest();
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin,Partner")]
        [HttpGet, Route("get"), ResponseType(typeof(AssignmentDisplayViewModel))]
        public IHttpActionResult GetAssignment(int id)
        {
            var result = _service.Get<AssignmentDisplayViewModel>(id);
            return result.IsSuccessful ? Ok(result) : (IHttpActionResult)NotFound();
        }
    }
}