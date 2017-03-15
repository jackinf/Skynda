using System.Web.Http;
using Triven.Application;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Email;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/email")]
    public class EmailController : BaseController
    {
        private readonly IEmailService _service;

        public EmailController()
        {
            _service = IoC.Get<IEmailService>();
        }

        [HttpPost, Route("subscribe")]
        public IHttpActionResult PostEmailSubscribe([FromBody] EmailSubscribeViewModel viewModel) 
            => HandleResult(_service.SendEmailAboutSubscription(viewModel));

        [HttpPost, Route("buy-vehicle")]
        public IHttpActionResult PostEmailBuyVehicle([FromBody] EmailBuyVehicleViewModel viewModel) 
            => HandleResult(_service.SendEmailAboutBuyingVehicle(viewModel));

        [HttpPost, Route("sell-vehicle")]
        public IHttpActionResult PostEmailSellVehicle([FromBody] EmailSellVehicleViewModel viewModel) 
            => HandleResult(_service.SendEmailAboutSellingVehicle(viewModel));

        [HttpPost, Route("question")]
        public IHttpActionResult PostEmailQuestion([FromBody] EmailQuestionViewModel viewModel) 
            => HandleResult(_service.SendEmailAboutQuestion(viewModel));
    }
}