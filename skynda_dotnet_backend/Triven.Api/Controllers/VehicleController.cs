using System.Web.Http;
using Microsoft.AspNet.Identity;

namespace Triven.API.Controllers
{
    [RoutePrefix("/api/vehicle")]
    public class VehicleController : BaseController
    {
        private readonly dynamic _service;
        //private readonly IVehicleService<ServiceResult> _service; // TODO: use this

        public VehicleController()
        {
            //_service = IoC.Get<IVehicleService<ServiceResult>>(); // TODO: Use this
        }

        [HttpGet, Route("~/api/vehicles")]
        public IHttpActionResult GetAll([FromBody] dynamic viewModel)
        {
            var result = _service.GetVehicles(viewModel);   // TODO: Rename to GetAll
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get([FromUri] int id)
        {
            var result = _service.GetVehicle(id);   // TODO: Rename to Get
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HttpGet, Route("{id:int}/detailed")]
        public IHttpActionResult GetDetailed([FromUri] int id)
        {
            var result = _service.GetVehicleDetailed(id);   // TODO: Rename to GetDetailed
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPost, Route("{id:int}")]
        public IHttpActionResult Add([FromBody] dynamic viewModel)  // TODO: viewModel
        {
            viewModel.Id = 0;
            var result = _service.CreateOrUpdateVehicle(viewModel);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPut, Route("{id:int}")]
        public IHttpActionResult Update([FromUri] int id, [FromBody] dynamic viewModel)
        {
            viewModel.Id = id;
            var result = _service.CreateOrUpdateVehicle(viewModel);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Delete([FromUri] int id)
        {
            var result = _service.DeleteVehicle(id);    // TODO: Rename to Delete
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Search([FromBody] dynamic searchParams)
        {
            var result = _service.Search(searchParams);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

    }
}