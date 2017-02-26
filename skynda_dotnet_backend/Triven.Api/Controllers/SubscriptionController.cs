using System.Web.Http;
using Triven.Application;
using Triven.Application.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Email;

namespace Triven.API.Controllers
{
    [RoutePrefix("/api/subscribe")]
    public class SubscriptionController : BaseController
    {
        private readonly ISubscriptionService<ServiceResult> _service;

        public SubscriptionController()
        {
            _service = IoC.Get<ISubscriptionService<ServiceResult>>();
        }

        // TODO: validate
        [HttpPost, Route("")]
        public IHttpActionResult SubscribeEmail([FromBody] EmailSubscribeViewModel viewModel) => HandleResult(_service.Subscribe(viewModel));
    }
}