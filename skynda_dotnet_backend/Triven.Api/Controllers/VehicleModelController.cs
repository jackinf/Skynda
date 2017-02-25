using System.Web.Http;
using Microsoft.AspNet.Identity;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

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
        public IHttpActionResult GetAll([FromBody] dynamic viewModel)   // Use vehicle model search params
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
        public IHttpActionResult Add([FromBody] VehicleModelViewModel viewModel)
        {
            viewModel.Id = 0;
            var result = _service.CreateOrUpdate(viewModel, ModelState);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPut, Route("{id:int}")]
        public IHttpActionResult Update([FromUri] int id, [FromBody] VehicleModelViewModel viewModel)
        {
            viewModel.Id = id;
            var result = _service.CreateOrUpdate(viewModel, ModelState);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Delete([FromUri] int id)
        {
            var result = _service.Delete(id);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("vehicle-models-by-manufacturers")]
        public IHttpActionResult GetAllByManufacturers(VehicleModelSearchRequestViewModel searchParams)
        {
            var result = _service.Search(searchParams);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }
    }
}