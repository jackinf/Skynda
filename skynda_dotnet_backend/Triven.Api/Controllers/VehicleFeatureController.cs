using System.Web.Http;
using Triven.Application;
using Triven.Domain.Services;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/vehicle-features")]
    public class VehicleFeatureController : BaseController
    {
        private readonly IVehicleFeatureService _service;

        public VehicleFeatureController()
        {
            _service = IoC.Get<IVehicleFeatureService>();
        }

        [HttpGet, Route("{id:int}")]
        public IHttpActionResult GetAllByVehicle([FromUri] int id) => HandleResult(_service.GetAllBy(id));
    }
}