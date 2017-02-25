using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using Triven.Application;
using Triven.Application.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Base;
using Triven.Domain.ViewModels.Partner.ContactPerson;

namespace Triven.API.Controllers.__ToDelete
{
    [RoutePrefix("api/partner/{partnerId:int}/contact-person")]
    public class PartnerContactPersonController : BaseController
    {
        private readonly IPartnerService<ServiceResult> _service;

        public PartnerContactPersonController()
        {
            _service = IoC.Get<IPartnerService<ServiceResult>>();
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin,Partner")]
        [HttpGet, Route(""), ResponseType(typeof(PartnerContactPersonDisplayViewModel))]
        public IHttpActionResult GetAll(int partnerId)
        {
            var result = _service.GetAllContactPersons<PartnerContactPersonDisplayViewModel>(partnerId);
            return result.IsSuccessful ? Ok(result) : (IHttpActionResult)NotFound();
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin,Partner")]
        [HttpGet, Route("{contactPersonId:int}"), ResponseType(typeof(PartnerContactPersonDisplayViewModel))]
        public IHttpActionResult Get(int partnerId, int contactPersonId)
        {
            var result = _service.GetContactPerson<PartnerContactPersonDisplayViewModel>(partnerId, contactPersonId);
            return result.IsSuccessful ? Ok(result) : (IHttpActionResult)NotFound();
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin,Partner")]
        [HttpPost, Route(""), ResponseType(typeof(PartnerContactPersonDisplayViewModel))]
        public IHttpActionResult AddContactPerson([FromUri] int partnerId, [FromBody] PartnerContactPersonDisplayViewModel viewModel)
        {
            var result = _service.AddContactPerson(partnerId, viewModel);
            return result.IsSuccessful ? Ok(result) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin,Partner")]
        [HttpPut, Route("{contactPersonId:int}"), ResponseType(typeof(PartnerContactPersonDisplayViewModel))]
        public IHttpActionResult UpdateContactPerson([FromUri] int partnerId, [FromUri] int contactPersonId, [FromBody] PartnerContactPersonDisplayViewModel viewModel)
        {
            var result = _service.UpdateContactPerson(partnerId, viewModel);
            return result.IsSuccessful ? Ok(result) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin,Partner")]
        [HttpDelete, Route("{contactPersonId:int}"), ResponseType(typeof(BasicResponseViewModel))]
        public IHttpActionResult DeleteContactPerson([FromUri] int partnerId, [FromUri] int contactPersonId)
        {
            var result = _service.DeleteContactPerson(partnerId, contactPersonId);
            return result.IsSuccessful ? Ok(result) : ReturnErrorResult(result.Validation);
        }
    }
}