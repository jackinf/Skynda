using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using X3Project.Application;
using X3Project.Application.Results;
using X3Project.Domain.Services;
using X3Project.Domain.ViewModels.Partner;

namespace X3Project.Controllers
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