using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using Triven.Application;
using Triven.Application.Attributes;
using Triven.Application.Results;
using Triven.Domain.Constants;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Account;

namespace Triven.API.Controllers.__ToDelete
{
    [RoutePrefix("api/partner/{partnerId:int}/user")]
    public class PartnerUserController : BaseController
    {
        private readonly IPartnerService<ServiceResult> _service;

        public PartnerUserController()
        {
            _service = IoC.Get<IPartnerService<ServiceResult>>();
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Authorize(Roles = "Admin"), RequireApiAccess(Auth.Roles.Admin)]
        [HttpGet, Route(""), ResponseType(typeof(List<AccountDisplayViewModel>))]
        public IHttpActionResult GetAll(int partnerId)
        {
            var result = _service.GetAllPartnersUsers(partnerId);
            return result.IsSuccessful ? (IHttpActionResult) Ok(result) : BadRequest();
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin,Partner")]
        [HttpPost, Route(""), ResponseType(typeof(bool))]
        public IHttpActionResult AddUser([FromUri] int partnerId, [FromBody] int userId)
        {
            var result = _service.AddPartnerUser(partnerId, userId);
            return result.IsSuccessful ? Ok(result) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin,Partner")]
        [HttpDelete, Route("{userId:int}"), ResponseType(typeof(bool))]
        public IHttpActionResult RemoveUser([FromUri] int partnerId, [FromUri] int userId)
        {
            var result = _service.RemovePartnerUser(partnerId, userId);
            return result.IsSuccessful ? Ok(result) : ReturnErrorResult(result.Validation);
        }
    }
}