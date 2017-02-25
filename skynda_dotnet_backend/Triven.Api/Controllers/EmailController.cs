using System.Web.Http;
using Triven.Domain.ViewModels.Email;

namespace Triven.API.Controllers
{
    [System.Web.Mvc.RoutePrefix("/api/email")]
    public class EmailController : BaseController
    {
        private readonly dynamic _service; // TODO: use correct type

        public EmailController()
        {
            // TODO: inject service
        }

        [HttpPost, Route("subscribe")]
        public IHttpActionResult PostEmailSubscribe([FromBody] EmailSubscribeViewModel viewModel)
        {
            // TODO: validate
            var result = _service.sendEmail(viewModel);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }


        [HttpPost, Route("subscribe")]
        public IHttpActionResult PostEmailBuyVehicle([FromBody] EmailBuyVehicleViewModel viewModel)
        {
            // TODO: validate
            var result = _service.sendEmail(viewModel);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }


        [HttpPost, Route("subscribe")]
        public IHttpActionResult PostEmailSellVehicle([FromBody] EmailSellVehicleViewModel viewModel)
        {
            // TODO: validate
            var result = _service.sendEmail(viewModel);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }


        [HttpPost, Route("subscribe")]
        public IHttpActionResult PostEmailQuestion([FromBody] EmailQuestionViewModel viewModel)
        {
            // TODO: validate
            var result = _service.sendEmail(viewModel);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

    }
}