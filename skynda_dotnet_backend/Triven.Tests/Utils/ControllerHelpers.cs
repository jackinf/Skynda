using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.DataProtection;
using NUnit.Framework;
using Triven.Application.Services;
using Triven.Data.EntityFramework;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.Results;

namespace Triven.FunctionalTests.Utils
{
    public static class ControllerHelpers
    {
        public static T GetOkPayload<T>(this IHttpActionResult result)
        {
            var okResult = result as OkNegotiatedContentResult<ServiceResult<T>>;
            Assert.NotNull(okResult, "Response was not ok");
            return okResult.Content.Payload;
        }

        public static void SetFakeOwinContext(this HttpRequestMessage request, ApplicationDbContext context)
        {
            var owinContext = new OwinContext();
            owinContext.Set(context);
            var userManager = new ApplicationUserManager(new AppUserStore(context));
            var provider = new DpapiDataProtectionProvider("Sample");
            userManager.UserTokenProvider = new DataProtectorTokenProvider<AppUser, int>(provider.Create("EmailConfirmation"));
            owinContext.Set(userManager);
            request.SetOwinContext(owinContext);
        }
    }
}