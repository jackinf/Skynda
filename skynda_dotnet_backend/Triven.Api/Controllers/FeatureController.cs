using System.Web.Http;
using Microsoft.AspNet.Identity;
using Triven.Application;
using Triven.Application.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Feature;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/feature")]
    public class FeatureController : BaseController
    {
        private readonly IFeatureService<ServiceResult> _service;

        public FeatureController()
        {
            _service = IoC.Get<IFeatureService<ServiceResult>>();
        }

        // TODO: use search params
        [HttpGet, Route("~/api/features")]
        public IHttpActionResult GetAll() => HandleResult(_service.GetAll());

        [HttpGet, Route("admin-select")]
        public IHttpActionResult GetAllForAdminSelect([FromUri] int id) => HandleResult(_service.GetAllForAdminSelect());

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get([FromUri] int id) => HandleResult(_service.Get(id));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPost, Route("")]
        public IHttpActionResult Add([FromBody] FeatureViewModel viewModel) => HandleResult(_service.Create(viewModel));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPut, Route("{id:int}")]
        public IHttpActionResult Update([FromUri] int id, [FromBody] FeatureViewModel viewModel) => HandleResult(_service.Update(id, viewModel));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Delete([FromUri] int id) => HandleResult(_service.Delete(id));
    }
}