using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using Triven.Application;
using Triven.Application.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Partner;

namespace Triven.API.Controllers.__ToDelete
{
    [RoutePrefix("api/statistics")]
    public class StatisticsController : BaseController
    {
        private readonly IPartnerService<ServiceResult> _service;

        public StatisticsController()
        {
            _service = IoC.Get<IPartnerService<ServiceResult>>();   // Ideally we should use some sort of statistics service...
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("header-stats"), ResponseType(typeof(PartnerDisplayViewModel))]
        public IHttpActionResult HeaderStats()
        {
            return Ok(new {waitingToConfirmUsers = _service.CountAllWaitingConfirmationPartners() });
        }
    }
}