using System.Web.Http;
using Triven.Application;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Email;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/subscribe")]
    public class SubscriptionController : BaseController
    {
        private readonly ISubscriptionService _service;

        public SubscriptionController()
        {
            _service = IoC.Get<ISubscriptionService>();
        }

        // TODO: validate
        [HttpPost, Route("")]
        public IHttpActionResult SubscribeEmail([FromBody] EmailSubscribeViewModel viewModel) => HandleResult(_service.Subscribe(viewModel));
    }
}