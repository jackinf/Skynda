using System.Web.Http;
using Triven.Application;
using Triven.Application.Results;
using Triven.Domain.Services;

namespace Triven.API.Controllers
{
    [RoutePrefix("/api/vehicle-features")]
    public class VehicleFeatureController : BaseController
    {
        private readonly IVehicleFeatureService<ServiceResult> _service;

        public VehicleFeatureController()
        {
            _service = IoC.Get<IVehicleFeatureService<ServiceResult>>();
        }

        [HttpGet, Route("{id:int}")]
        public IHttpActionResult GetAllByVehicle([FromUri] int id) => HandleResult(_service.GetAllBy(id));
    }
}