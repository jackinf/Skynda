using System.Web.Http;
using Microsoft.AspNet.Identity;

namespace Triven.API.Controllers
{
    [RoutePrefix("/api/vehicle-model")]
    public class VehicleModelController : BaseController
    {
        private readonly dynamic _service;
        //private readonly IVehicleModelService<ServiceResult> _service; // TODO: use this

        public VehicleModelController()
        {
            //_service = IoC.Get<IVehicleModelService<ServiceResult>>(); // TODO: Use this
        }

        [HttpGet, Route("~/api/vehicle-models")]
        public IHttpActionResult GetAll([FromBody] dynamic viewModel)
        {
            var result = _service.GetAll(viewModel);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get([FromUri] int id)
        {
            var result = _service.Get(id);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }
        
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPost, Route("{id:int}")]
        public IHttpActionResult Add([FromBody] dynamic viewModel)
        {
            viewModel.Id = 0;
            var result = _service.CreateOrUpdateVehicle(viewModel);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPut, Route("{id:int}")]
        public IHttpActionResult Update([FromUri] int id, [FromBody] dynamic vehicleAdminViewModel)
        {
            vehicleAdminViewModel.Id = id;
            var result = _service.CreateOrUpdateVehicle(vehicleAdminViewModel);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Delete([FromUri] int id)
        {
            var result = _service.DeleteVehicle(id);
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