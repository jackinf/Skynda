using System.Web.Http;
using Triven.Application;
using Triven.Application.Results;
using Triven.Domain.Services;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/image")]
    public class ImageController : BaseController
    {
        private readonly IImageService<ServiceResult> _service;

        public ImageController()
        {
            _service = IoC.Get<IImageService<ServiceResult>>();
        }

        [HttpGet, Route("list")]
        public IHttpActionResult List([FromBody] string containerName) => HandleResult(_service.List(containerName));
    }
}