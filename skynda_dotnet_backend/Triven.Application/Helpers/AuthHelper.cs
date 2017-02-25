using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;
using X3Project.Data.EntityFramework.Models.User;
using X3Project.Domain.Constants;

namespace X3Project.Application.Helpers
{
    public static class AuthHelper
    {

        /// <summary>
        /// User is authorized
        /// </summary>
        /// <returns></returns>
        public static bool IsAuthorized()
        {
            if (HttpContext.Current.User?.Identity != null && HttpContext.Current.User.Identity.IsAuthenticated)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// Get authorized user info
        /// </summary>
        /// <returns></returns>
        public static ApplicationUser GetAuthorizedApplicationUserInfo()
        {
            if (HttpContext.Current.User?.Identity != null && HttpContext.Current.User.Identity.IsAuthenticated)
            {
                var uInfo = HttpContext.Current.User.Identity;
                var manager = new ApplicationUserManager(new AppUserStore());
                var appUser = manager.FindByEmail(uInfo.Name);
                return appUser as ApplicationUser;
            }
            return null;
        }

        /// <summary>
        /// Returns authorized used ID
        /// </summary>
        /// <returns></returns>
        public static int GetAuthorizedUserId()
        {
            int id = 0;
            if (HttpContext.Current.User?.Identity != null
                && HttpContext.Current.User.Identity.IsAuthenticated)
            {
                var userIdClim = HttpContext.Current.User.Identity.GetUserId();
                Int32.TryParse(userIdClim, out id);
            }
            return id;
        }

        /// <summary>
        /// List of roles for current logged in user
        /// </summary>
        /// <returns></returns>
        public static List<string> GetAuthorizedUserRoles()
        {
            List<string> result = new List<string>();
            if (HttpContext.Current.User?.Identity != null
                && HttpContext.Current.User.Identity.IsAuthenticated)
            {
                var user = GetAuthorizedApplicationUserInfo();
                string[] roles = Enum.GetNames(typeof(Auth.Roles));
                foreach (string role in roles)
                {
                    if (HttpContext.Current.User.IsInRole(role))
                        result.Add(role);
                }

            }
            return result;
        }
    }
}
