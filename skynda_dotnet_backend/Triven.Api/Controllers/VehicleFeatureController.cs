using System.Web.Http;

namespace Triven.API.Controllers
{
    [RoutePrefix("/api/vehicle-features")]
    public class VehicleFeatureController : BaseController
    {
        private readonly dynamic _service;
        //private readonly IVehicleFeatureService<ServiceResult> _service; // TODO: use this

        public VehicleFeatureController()
        {
            //_service = IoC.Get<IVehicleFeatureService<ServiceResult>>(); // TODO: Use this
        }

        [HttpGet, Route("{id:int}")]
        public IHttpActionResult GetAllByVehicle([FromUri] int id)
        {
            var result = _service.GetAllById(id);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }
    }
}