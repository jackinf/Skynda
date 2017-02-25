using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using X3Project.Application;
using X3Project.Application.Results;
using X3Project.Domain.Services;
using X3Project.Domain.ViewModels.Base;
using X3Project.Domain.ViewModels.Partner;
using X3Project.Domain.ViewModels.Partner.Vehicle;

namespace X3Project.Controllers
{
    [RoutePrefix("api/partner-vehicle")]
    public class PartnerVehicleController : BaseController
    {
        private readonly IPartnerService<ServiceResult> _service;

        public PartnerVehicleController()
        {
            _service = IoC.Get<IPartnerService<ServiceResult>>();
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Authorize(Roles = "Admin,Partner")]
        [HttpGet, Route("vehicles"), ResponseType(typeof(PartnerVehicleDisplayViewModel))]
        public IHttpActionResult GetAll(int id)
        {
            var result = _service.GetAllVehicles<PartnerVehicleDisplayViewModel>(id);
            return result.IsSuccessful ? Ok(result) : (IHttpActionResult)NotFound();
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Authorize(Roles = "Admin,Partner")]
        [HttpGet, Route("vehicle/{id:int}/{vehicleId:int}"), ResponseType(typeof(PartnerVehicleDisplayViewModel))]
        public IHttpActionResult GetVehicle([FromUri] int id, [FromUri] int vehicleId)
        {
            var result = _service.GetVehicle<PartnerVehicleDisplayViewModel>(id, vehicleId);
            return result.IsSuccessful ? Ok(result) : (IHttpActionResult)NotFound();
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Authorize(Roles = "Admin,Partner")]
        [HttpPost, Route("add/{id:int}"), ResponseType(typeof(PartnerVehicleDisplayViewModel))]
        public IHttpActionResult AddVehicle([FromUri] int id, [FromBody] PartnerVehicleDisplayViewModel viewModel)
        {
            var result = _service.AddVehicle(id, viewModel);
            return result.IsSuccessful ? Ok(result) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Authorize(Roles = "Admin,Partner")]
        [HttpPut, Route("update/{id:int}/{vehicleId:int}"), ResponseType(typeof(PartnerVehicleDisplayViewModel))]
        public IHttpActionResult UpdateVehicle([FromUri] int id, [FromUri] int vehicleId, [FromBody] PartnerVehicleDisplayViewModel viewModel)
        {
            var result = _service.UpdateVehicle(id, vehicleId, viewModel);
            return result.IsSuccessful ? Ok(result) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin,Partner")]
        [HttpPost, Route("changestatus/{id:int}/{vehicleId:int}"), ResponseType(typeof(BasicResponseViewModel))]
        public IHttpActionResult ChangeVehicleStatus([FromUri] int id, [FromUri] int vehicleId, [FromBody] PartnerStatusPutViewModel viewModel)
        {
            var result = _service.UpdateVehicleStatus(id, vehicleId, viewModel);
            return result.IsSuccessful ? Ok(result) : ReturnErrorResult(result.Validation);
        }

        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        [Authorize(Roles = "Admin,Partner")]
        [HttpDelete, Route("delete/{id:int}/{vehicleId:int}"), ResponseType(typeof(BasicResponseViewModel))]
        public IHttpActionResult DeleteContactPerson([FromUri] int id, [FromUri] int vehicleId)
        {
            var result = _service.DeleteVehicle(id, vehicleId);
            return result.IsSuccessful ? Ok(result) : ReturnErrorResult(result.Validation);
        }
    }
}