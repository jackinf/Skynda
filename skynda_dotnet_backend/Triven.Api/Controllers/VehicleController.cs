using System;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Triven.Application;
using Triven.Application.Attributes;
using Triven.Domain.Constants;
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

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer), RequireApiAccess(Auth.Roles.Admin, Auth.Roles.VehicleManager)]
        [HttpGet, Route("~/api/vehicles")]
        public IHttpActionResult GetAll([FromUri] SearchRequestViewModel viewModel) => HandleResult(_service.GetAll());

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer), RequireApiAccess(Auth.Roles.Admin, Auth.Roles.VehicleManager)]
        [HttpGet, Route("{id:int}/detailed")]
        public IHttpActionResult GetDetailed([FromUri] int id) => HandleResult(_service.GetDetailed(id));

        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get([FromUri] int id) => HandleResult(_service.Get(id));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer), RequireApiAccess(Auth.Roles.Admin, Auth.Roles.VehicleManager)]
        [HttpPost, Route("")]
        public IHttpActionResult Add([FromBody] VehicleAdminViewModel viewModel) => HandleResult(_service.Create(viewModel));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer), RequireApiAccess(Auth.Roles.Admin, Auth.Roles.VehicleManager)]
        [HttpPut, Route("{id:int}")]
        public IHttpActionResult Update([FromUri] int id, [FromBody] VehicleAdminViewModel viewModel) => HandleResult(_service.Update(id, viewModel));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer), RequireApiAccess(Auth.Roles.Admin, Auth.Roles.VehicleManager)]
        [HttpDelete, Route("{id:int}")]
        public IHttpActionResult Delete([FromUri] int id) => HandleResult(_service.Delete(id));

        /// <summary>
        /// Non-authenticated users use this.
        /// </summary>
        /// <param name="searchParams"></param>
        /// <returns></returns>
        [HttpPost, Route("search")]
        public IHttpActionResult Search([FromBody] SearchRequestViewModel searchParams) => HandleResult(_service.Search(searchParams));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer), RequireApiAccess(Auth.Roles.Admin, Auth.Roles.VehicleManager)]
        [HttpPut, Route("{vehicleId:int}/publish")]
        public IHttpActionResult Publish(int vehicleId) => HandleResult(_service.Publish(vehicleId));

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer), RequireApiAccess(Auth.Roles.Admin, Auth.Roles.VehicleManager)]
        [HttpPut, Route("{vehicleId:int}/unpublish")]
        public IHttpActionResult Unpublish(int vehicleId) => HandleResult(_service.Unpublish(vehicleId));
    }
}