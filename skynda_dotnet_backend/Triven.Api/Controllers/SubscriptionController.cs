using System.Web.Http;

namespace Triven.API.Controllers
{
    [RoutePrefix("/api/subscribe")]
    public class SubscriptionController : BaseController
    {
        private readonly dynamic _service;
        //private readonly IVehicleFeatureService<ServiceResult> _service; // TODO: use this

        public SubscriptionController()
        {
            //_service = IoC.Get<IVehicleFeatureService<ServiceResult>>(); // TODO: Use this
        }

        [HttpPost, Route("")]
        public IHttpActionResult SubscribeEmail([FromUri] int id)
        {
            // TODO: validate
            var result = _service.subscribe(id, ModelState);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }
    }
}