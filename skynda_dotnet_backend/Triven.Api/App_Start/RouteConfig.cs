using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Swashbuckle.Application;

namespace Triven.API
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // http://stackoverflow.com/questions/30028736/how-to-use-swagger-as-welcome-page-of-iappbuilder-in-webapi
            routes.MapHttpRoute(
                name: "swagger_root",
                routeTemplate: "",
                defaults: null,
                constraints: null,
                handler: new RedirectHandler((message => message.RequestUri.ToString()), "swagger"));

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new {controller = "Home", action = "Index", id = UrlParameter.Optional}
            );
        }
    }
}