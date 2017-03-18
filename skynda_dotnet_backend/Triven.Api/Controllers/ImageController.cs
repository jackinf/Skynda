using System.Web.Http;
using Microsoft.AspNet.Identity;
using Triven.Application;
using Triven.Application.Attributes;
using Triven.Domain.Constants;
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

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer), RequireApiAccess(Auth.Roles.Admin)]
        [HttpGet, Route("list")]
        public IHttpActionResult List([FromBody] string containerName) => HandleResult(_service.List(containerName));
    }
}