using System.Web.Http;
using Microsoft.AspNet.Identity;
using Triven.Application;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/vehicle-model")]
    public class VehicleModelController : BaseController
    {
        private readonly IVehicleModelService _service;

        public VehicleModelController()
        {
            _service = IoC.Get<IVehicleModelService>();
        }

        // TODO: Use vehicle model search params
        [HttpGet, Route("~/api/vehicle-models")]
        public IHttpActionResult GetAll([FromBody] VehicleModelViewModel viewModel) => HandleResult(_service.GetAll());

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get([FromUri] int id) => HandleResult(_service.Get(id));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPost, Route("")]
        public IHttpActionResult Add([FromBody] VehicleModelViewModel viewModel)
        {
            
            return HandleResult(_service.Create(viewModel));
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPut, Route("{id:int}")]
        public IHttpActionResult Update([FromUri] int id, [FromBody] VehicleModelViewModel viewModel) => HandleResult(_service.Update(id, viewModel));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Delete([FromUri] int id) => HandleResult(_service.Delete(id));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("vehicle-models-by-manufacturers")]
        public IHttpActionResult GetAllByManufacturers(VehicleModelSearchRequestViewModel searchParams) => HandleResult(_service.Search(searchParams));
    }
}