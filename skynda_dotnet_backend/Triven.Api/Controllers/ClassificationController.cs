using System.Web.Http;
using Triven.Application;
using Triven.Domain.Services;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/classification")]    // TODO: use singular, not plural
    public class ClassificationController : BaseController
    {
        private readonly IClassificationService _service;

        public ClassificationController()
        {
            _service = IoC.Get<IClassificationService>();
        }

        [HttpGet, Route("{type}")]
        public IHttpActionResult GetAll([FromUri] string type)
        {
            return HandleResult(_service.GetByType(type));
        }

        [HttpGet, Route("{type}/vehicle-bound")]
        public IHttpActionResult GetVehicleBound([FromUri] string type) => HandleResult(_service.GetByTypeAndVehicleBound(type));
    }
}