using System.Web.Http;
using Microsoft.AspNet.Identity;
using Triven.Application;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/vehicle-review")]
    public class VehicleReviewController : BaseController
    {
        private readonly IVehicleReviewService _service;

        public VehicleReviewController()
        {
            _service = IoC.Get<IVehicleReviewService>();
        }

        // TODO: use search params
        [HttpGet, Route("~/api/vehicle-reviews")]
        public IHttpActionResult GetAll() => HandleResult(_service.GetAll());

        // TODO: use search params
        [HttpGet, Route("~/api/vehicle-reviews/{id:int}")]
        public IHttpActionResult GetAllByVehicle([FromUri] int id) => HandleResult(_service.GetAllBy(id));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get([FromUri] int id) => HandleResult(_service.Get(id));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPost, Route("~/api/vehicle/{vehicleId:int}/vehicle-review")]
        public IHttpActionResult Add([FromBody] VehicleReviewViewModel viewModel) => HandleResult(_service.Create(viewModel));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPut, Route("~/api/vehicle/{vehicleId:int}/vehicle-review/{id:int}")]
        public IHttpActionResult Update([FromUri] int id, [FromBody] VehicleReviewViewModel viewModel) => HandleResult(_service.Update(id, viewModel));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Delete([FromUri] int id) => HandleResult(_service.Delete(id));
    }
}