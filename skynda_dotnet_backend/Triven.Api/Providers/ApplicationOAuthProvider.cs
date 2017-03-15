using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Triven.Application;
using Triven.Application.Services;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.Constants;

namespace Triven.API.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;

        public ApplicationOAuthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }

            _publicClientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            var roleManager = context.OwinContext.Get<ApplicationRoleManager>();

            var user = await userManager.FindAsync(context.UserName, context.Password);

            if (user == null)
            {
                context.SetError("message", "The username or password is incorrect.");
                return;
            }

            if (!user.EmailConfirmed)
            {
                //context.SetError("message", "Your email isn't confimed yet. Please look your mailbox.");
                //return;
            }

            var applicationUser = user as ApplicationUser;
            if (applicationUser == null || applicationUser.Status != Status.Active)
            {
                context.SetError("message", "User is not activated or blocked. Try again later.");  // "later" will never come lol :D
                return;
            }

            ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager,
               OAuthDefaults.AuthenticationType);
            ClaimsIdentity cookiesIdentity = await user.GenerateUserIdentityAsync(userManager,
                CookieAuthenticationDefaults.AuthenticationType);

            AuthenticationProperties properties = CreateProperties(user, userManager);
            AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
            context.Validated(ticket);
            context.Request.Context.Authentication.SignIn(cookiesIdentity);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(AppUser user, ApplicationUserManager userManager)
        {
            List<string> roleResult = new List<string>();
            var usr = user as ApplicationUser;

            //Find user active roles
            string[] roles = Enum.GetNames(typeof(Auth.Roles));
            foreach (string role in roles)
            {
                if (userManager.IsInRole(user.Id, role))
                    roleResult.Add(role.ToLower());
            }
            IDictionary<string, string> data = new Dictionary<string, string>();
            JavaScriptSerializer js = new JavaScriptSerializer();
            if (usr != null)
            {
                data.Add("firstName", usr.FirstName ?? "");
                data.Add("lastName", usr.LastName ?? "");
                data.Add("fullName", usr.GetFullName() ?? "");
                data.Add("status", usr.Status.ToString());
                data.Add("id", usr.Id.ToString());
                data.Add("roles", js.Serialize(roleResult));
            }
            return new AuthenticationProperties(data);
        }
    }
}