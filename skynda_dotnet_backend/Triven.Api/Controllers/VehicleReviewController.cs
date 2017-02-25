using System.Web.Http;
using Microsoft.AspNet.Identity;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.API.Controllers
{
    [RoutePrefix("/api/vehicle-review")]
    public class VehicleReviewController : BaseController
    {
        private readonly dynamic _service;
        //private readonly IVehicleReviewService<ServiceResult> _service; // TODO: use this

        public VehicleReviewController()
        {
            //_service = IoC.Get<IVehicleReviewService<ServiceResult>>(); // TODO: Use this
        }

        [HttpGet, Route("~/api/vehicle-reviews")]
        public IHttpActionResult GetAll()   // TODO: use search params
        {
            var result = _service.GetAll();
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HttpGet, Route("~/api/vehicle-reviews/{id:int}")]
        public IHttpActionResult GetAllByVehicle([FromUri] int id)   // TODO: use search params
        {
            var result = _service.GetAllBy(id);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get([FromUri] int id)
        {
            var result = _service.GetSingleBy(id);  // TODO: Rename to Get
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPost, Route("{id:int}")]
        public IHttpActionResult Add([FromBody] VehicleReviewViewModel viewModel)
        {
            viewModel.Id = 0;
            var result = _service.CreateOrUpdate(viewModel, ModelState);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPut, Route("{id:int}")]
        public IHttpActionResult Update([FromUri] int id, [FromBody] VehicleReviewViewModel viewModel)
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
    }
}