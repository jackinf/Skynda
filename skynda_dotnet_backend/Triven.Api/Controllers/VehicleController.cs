using System;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Triven.Application;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/vehicle")]
    public class VehicleController : BaseController
    {
        private readonly IVehicleService _service;

        public VehicleController()
        {
            _service = IoC.Get<IVehicleService>();
        }

        [HttpGet, Route("~/api/vehicles")]
        public IHttpActionResult GetAll([FromBody] SearchRequestViewModel viewModel) => HandleResult(_service.GetAll());

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get([FromUri] int id) => HandleResult(_service.Get(id));

        [HttpGet, Route("{id:int}/detailed")]
        public IHttpActionResult GetDetailed([FromUri] int id) => HandleResult(_service.GetDetailed(id));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPost, Route("")]
        public IHttpActionResult Add([FromBody] VehicleAdminViewModel viewModel) => HandleResult(_service.Create(viewModel));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpPut, Route("{id:int}")]
        public IHttpActionResult Update([FromUri] int id, [FromBody] dynamic viewModel)
        {
            try
            {
                return HandleResult(_service.Update(id, viewModel));

            }
            catch (Exception ex)
            {
                
                throw;
            }
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Delete([FromUri] int id) => HandleResult(_service.Delete(id));

        [Obsolete("Use GetAll")]    // TODO : Use get all if searchParams exist
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Search([FromBody] SearchRequestViewModel searchParams) => HandleResult(_service.Search(searchParams));
    }
}