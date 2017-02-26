using System.Threading.Tasks;
using System.Web.Http;
using Triven.Application;
using Triven.Domain.ViewModels.Email;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/email")]
    public class EmailController : BaseController
    {
        private readonly EmailService _service; // TODO: use interface

        public EmailController()
        {
            _service = new EmailService();
        }

        [HttpPost, Route("subscribe")]
        public async Task<IHttpActionResult> PostEmailSubscribe([FromBody] EmailSubscribeViewModel viewModel)
        {
            // TODO: validate
            await _service.SendAsync(viewModel);
            return Ok();
        }


        [HttpPost, Route("buy-vehicle")]
        public async Task<IHttpActionResult> PostEmailBuyVehicle([FromBody] EmailBuyVehicleViewModel viewModel)
        {
            // TODO: validate
            await _service.SendAsync(viewModel);
            return Ok();
        }


        [HttpPost, Route("sell-vehicle")]
        public async Task<IHttpActionResult> PostEmailSellVehicle([FromBody] EmailSellVehicleViewModel viewModel)
        {
            // TODO: validate
            await _service.SendAsync(viewModel);
            return Ok();
        }


        [HttpPost, Route("question")]
        public async Task<IHttpActionResult> PostEmailQuestion([FromBody] EmailQuestionViewModel viewModel)
        {
            // TODO: validate
            await _service.SendAsync(viewModel);
            return Ok();
        }

    }
}