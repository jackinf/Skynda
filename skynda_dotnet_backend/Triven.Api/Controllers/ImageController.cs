using System.Web.Http;
using Triven.Application;
using Triven.Domain.Services;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/image")]
    public class ImageController : BaseController
    {
        private readonly IImageService _service;

        public ImageController()
        {
            _service = IoC.Get<IImageService>();
        }

        [HttpGet, Route("list")]
        public IHttpActionResult List([FromBody] string containerName) => HandleResult(_service.List(containerName));
    }
}