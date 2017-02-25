using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Triven.Application;
using Triven.Application.Attributes;
using Triven.Application.Results;
using Triven.Domain.Constants;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Partner;

namespace Triven.API.Controllers.__ToDelete
{
    [RoutePrefix("api/Partner")]
    public class PartnerController : BaseController
    {
        private readonly IPartnerService<ServiceResult> _service;

        public PartnerController()
        {
            _service = IoC.Get<IPartnerService<ServiceResult>>();
        }

        // POST api/partner/register
        [AllowAnonymous, HttpPost, Route("Register")]
        public IHttpActionResult Register([FromBody] PartnerRegisterViewModel viewModel)
        {
            string emailConfirmUrl = Url.Link("Default", new { Controller = "Account", Action = "", userId = "USERID", code = "CODE" });
            _service.UserManger = Request.GetOwinContext().GetUserManager<ApplicationUserManager>();    // TODO:... get rid of this...?
            var result = _service.Register(viewModel, emailConfirmUrl);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Authorize(Roles = "Admin")]
        [RequireApiAccess(Auth.Roles.Admin)]
        [HttpGet, Route("partners"), ResponseType(typeof(List<PartnerDisplayViewModel>))]
        public IHttpActionResult GetPartners()
        {
            var result = _service.GetAll<PartnerDisplayViewModel>();
            return result.IsSuccessful ? (IHttpActionResult)Ok(result) : BadRequest();
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin,Partner")]
        [HttpGet, Route("partner-info"), ResponseType(typeof(PartnerDisplayViewModel))]
        public IHttpActionResult GetPartner(int id)
        {
            var result = _service.Get<PartnerDisplayViewModel>(id);
            return result.IsSuccessful ? Ok(result) : (IHttpActionResult)NotFound();
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin,Partner")]
        [Route("{id:int}"), HttpPut, ResponseType(typeof(void))]
        public IHttpActionResult UpdatePartner([FromUri] int id, [FromBody] PartnerPutViewModel viewModel)
        {
            var result = _service.Update(id, viewModel);
            return result.IsSuccessful ? Ok(result) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin")]
        [Route("update-partner-status/{id:int}"), HttpPost, ResponseType(typeof(void))]
        public IHttpActionResult UpdatePartnerStatus([FromUri] int id, [FromBody] PartnerStatusPutViewModel viewModel)
        {
            var result = _service.UpdateStatus(id, viewModel);
            return result.IsSuccessful ? Ok(result) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Authorize(Roles = "Admin")]
        [Route("activate-partner/{id:int}"), HttpPost, ResponseType(typeof(void))]
        public IHttpActionResult ActivatePartner([FromUri] int id)
        {
            var result = _service.ActivatePartner(id);
            return result.IsSuccessful ? Ok(result) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Authorize(Roles = "Admin")]
        [Route("deactivate-partner/{id:int}"), HttpPost, ResponseType(typeof(void))]
        public IHttpActionResult DeactivatePartner([FromUri] int id)
        {
            var result = _service.DeactivatePartner(id);
            return result.IsSuccessful ? Ok(result) : ReturnErrorResult(result.Validation);
        }
    }
}