using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using X3Project.Application;
using X3Project.Application.Results;
using X3Project.Domain.Services;
using X3Project.Domain.ViewModels.Assignment;

namespace X3Project.Controllers
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