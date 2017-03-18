using System.Data.Entity.Migrations;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using Triven.Data.EntityFramework.Migrations;

namespace Triven.API
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

#if !DEBUG
            var configuration = new Configuration();
            var migrator = new DbMigrator(configuration);
            migrator.Update();
#endif
        }
    }
}
