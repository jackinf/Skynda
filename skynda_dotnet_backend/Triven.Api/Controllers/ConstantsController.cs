using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using X3Project.Application.Services.Messages;
using X3Project.Domain.Constants;
using X3Project.Domain.Infrastructure.Notice;
using X3Project.Domain.ViewModels.Partner;

namespace X3Project.Controllers
{
    [RoutePrefix("api/constants")]
    public class ConstantsController : BaseController
    {
        [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        //[Authorize(Roles = "Admin")]
        [HttpGet, Route("countries"), ResponseType(typeof(List<PartnerDisplayViewModel>))]
        public IHttpActionResult GetCountries()
        {
            return BadRequest();
        }
    }
}