using System.Web.Http;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/classifications")]    // TODO: use singular, not plural
    public class ClassificationController : BaseController
    {
        //[HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        ////[Authorize(Roles = "Admin")]
        //[HttpGet, Route("countries"), ResponseType(typeof(List<PartnerDisplayViewModel>))]
        //public IHttpActionResult GetCountries()
        //{
        //    return BadRequest();
        //}

        private readonly dynamic _service; // TODO: use correct type

        public ClassificationController()
        {
            // TODO: inject service
        }

        [HttpGet, Route("{type}")]
        public IHttpActionResult GetAll([FromUri] string type)
        {
            var result = _service.GetByType(type);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

        [HttpGet, Route("{type}/vehicle-bound")]
        public IHttpActionResult GetVehicleBound([FromUri] string type)
        {
            var result = _service.GetByTypeAndVehicleBound(type);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }
    }
}