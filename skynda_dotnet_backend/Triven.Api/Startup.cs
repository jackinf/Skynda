using System.Net.Http.Headers;
using System.Web.Http;
using Microsoft.Owin;
using Newtonsoft.Json.Serialization;
using Owin;
using Triven.Application;
using Triven.API;

[assembly: OwinStartup(typeof(Startup))]

namespace Triven.API
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            Initializer.Initialize();

            // Every JSON returned will be camel cased
            HttpConfiguration config = GlobalConfiguration.Configuration;
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;

            // This will tell to return everything in JSON. This is needed to avoid this error when calling api actions: https://gyazo.com/19fad821add4057a3b42b57a1921d71c
            // Source: http://stackoverflow.com/questions/9847564/how-do-i-get-asp-net-web-api-to-return-json-instead-of-xml-using-chrome
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
        }
    }
}
