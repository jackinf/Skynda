using System.Web.Http;
using Microsoft.AspNet.Identity;
using Triven.Application;
using Triven.Application.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/vehicle-report")]
    public class VehicleReportController : BaseController
    {
        private readonly IVehicleReportService<ServiceResult> _service;

        public VehicleReportController()
        {
            _service = IoC.Get<IVehicleReportService<ServiceResult>>();
        }

        // TODO: use search params
        [HttpGet, Route("~/api/vehicle-reports")]
        public IHttpActionResult GetAll() => HandleResult(_service.GetAll());

        // TODO: use search params
        [HttpGet, Route("~/api/vehicle-reports/{id:int}")]
        public IHttpActionResult GetAllByVehicle([FromUri] int id) => HandleResult(_service.GetAllBy(id));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get([FromUri] int id) => HandleResult(_service.Get(id));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPost, Route("{id:int}")]
        public IHttpActionResult Add([FromBody] VehicleReportViewModel viewModel) => HandleResult(_service.Create(viewModel));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPut, Route("{id:int}")]
        public IHttpActionResult Update([FromUri] int id, [FromBody] VehicleReportViewModel viewModel) => HandleResult(_service.Update(id, viewModel));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Delete([FromUri] int id) => HandleResult(_service.Delete(id));
    }
}