using System.Web.Http;
using Microsoft.AspNet.Identity;
using Triven.Application;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/vehicle-report")]
    public class VehicleReportController : BaseController
    {
        private readonly IVehicleReportService _service;

        public VehicleReportController()
        {
            _service = IoC.Get<IVehicleReportService>();
        }

        // TODO: use search params
        [HttpGet, Route("~/api/vehicle-reports")]
        public IHttpActionResult GetAll() => HandleResult(_service.GetAll());

        // TODO: use search params
        [HttpGet, Route("~/api/vehicle-reports/{vehicleId:int}")]
        public IHttpActionResult GetAllByVehicle([FromUri] int vehicleId) => HandleResult(_service.GetAllBy(vehicleId));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get([FromUri] int id) => HandleResult(_service.Get(id));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPost, Route("~/api/vehicle/{vehicleId:int}/vehicle-report")]
        public IHttpActionResult Add([FromUri] int vehicleId, [FromBody] VehicleReportViewModel viewModel) 
            => HandleResult(_service.Create(vehicleId, viewModel));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPut, Route("~/api/vehicle/{vehicleId:int}/vehicle-report/{id:int}")]
        public IHttpActionResult Update([FromUri] int vehicleId, [FromUri] int id, [FromBody] VehicleReportViewModel viewModel) 
            => HandleResult(_service.Update(vehicleId, id, viewModel));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Delete([FromUri] int id) => HandleResult(_service.Delete(id));
    }
}