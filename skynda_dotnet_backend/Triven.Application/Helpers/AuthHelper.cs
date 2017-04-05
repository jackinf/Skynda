using System;
using System.Collections.Generic;
using Microsoft.AspNet.Identity;
using Triven.Application.Services;
using Triven.Data.EntityFramework.Entities.User;
using Triven.Domain.Constants;
using Triven.Domain.Util;

namespace Triven.Application.Helpers
{
    public static class AuthHelper
    {

        /// <summary>
        /// User is authorized
        /// </summary>
        /// <returns></returns>
        public static bool IsAuthorized()
        {
            if (HttpContextManager.Current.User?.Identity != null && HttpContextManager.Current.User.Identity.IsAuthenticated)
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
            if (HttpContextManager.Current.User?.Identity != null && HttpContextManager.Current.User.Identity.IsAuthenticated)
            {
                var uInfo = HttpContextManager.Current.User.Identity;
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
            if (HttpContextManager.Current.User?.Identity != null
                && HttpContextManager.Current.User.Identity.IsAuthenticated)
            {
                var userIdClim = HttpContextManager.Current.User.Identity.GetUserId();
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
            if (HttpContextManager.Current.User?.Identity != null
                && HttpContextManager.Current.User.Identity.IsAuthenticated)
            {
                var user = GetAuthorizedApplicationUserInfo();
                string[] roles = Enum.GetNames(typeof(Auth.Roles));
                foreach (string role in roles)
                {
                    if (HttpContextManager.Current.User.IsInRole(role))
                        result.Add(role);
                }

            }
            return result;
        }
    }
}
