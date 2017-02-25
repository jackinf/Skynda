using System.Web.Http;

namespace Triven.API.Controllers
{
    [RoutePrefix("/api/iamge")]
    public class ImageController : BaseController
    {
        private readonly dynamic _service; // TODO: use correct type

        public ImageController()
        {
            _service = null;  // TODO: inject service
        }

        [HttpGet, Route("list")]
        public IHttpActionResult List([FromBody] string containerName)
        {
            var result = _service.subscribe(containerName);
            return result.IsSuccessful ? Ok(result.Payload) : ReturnErrorResult(result.Validation);
        }

    }
}