using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using Triven.Domain.ViewModels.Partner;

namespace Triven.API.Controllers
{
    [RoutePrefix("api/constants")]
    public class ClassificationController : BaseController
    {
        //[HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
        ////[Authorize(Roles = "Admin")]
        //[HttpGet, Route("countries"), ResponseType(typeof(List<PartnerDisplayViewModel>))]
        //public IHttpActionResult GetCountries()
        //{
        //    return BadRequest();
        //}
    }
}