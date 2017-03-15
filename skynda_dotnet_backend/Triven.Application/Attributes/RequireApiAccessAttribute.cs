using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using Microsoft.AspNet.Identity;
using Triven.Application.Services;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.Constants;

namespace Triven.Application.Attributes
{
    public class RequireApiAccessAttribute : AuthorizeAttribute
    {
        private Auth.Roles[] _permissions;

        public RequireApiAccessAttribute(params Auth.Roles[] permissions)
        {
            _permissions = permissions;
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            base.OnAuthorization(actionContext);
        }

        /// <summary>
        /// Permission is only for those users, who email is confirmd
        /// and account status is active
        /// </summary>
        /// <param name="actionContext"></param>
        /// <returns></returns>
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            var manager = new ApplicationUserManager(new AppUserStore());

            var identity = actionContext.RequestContext.Principal.Identity;
            var userInfo = manager.FindByEmail(identity.GetUserId()) as ApplicationUser;
            if (userInfo == null)
                return false;
            return actionContext.RequestContext.Principal.Identity.IsAuthenticated &&
                (_permissions.Length == 0 ||
                _permissions.Any(
                    x => actionContext.RequestContext.Principal.IsInRole(x.ToString())
                    && userInfo.EmailConfirmed
                    && userInfo.Status == Status.Active));
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            string user = "Not logged in";
            int uid = default(int);

            if (HttpContext.Current.User.Identity != null && HttpContext.Current.User.Identity.IsAuthenticated)
            {
                var uInfo = HttpContext.Current.User.Identity;
                user = uInfo.Name;
                uid = uInfo.GetUserId<int>();
            }

            //log unauthorized attempt
            //var logger = log4net.LogManager.GetLogger(this.GetType());
            //logger.WarnFormat("Unauthorized api attempt at {0} from {1} by user {2} with Id {3}", actionContext.Request.RequestUri.OriginalString,
            //    actionContext.Request.GetClientIpAddress(), user, uid);

            //actionContext.Response = new HttpResponseMessage(System.Net.HttpStatusCode.Forbidden);
        }
    }
}
