using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace WebApplicationFramework1
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            //return http response in Json format in default 
            /*
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings
    .ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            GlobalConfiguration.Configuration.Formatters
                .Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);
            */

            //avoid Json serialization looping 
            //https://stackoverflow.com/questions/19467673/entity-framework-self-referencing-loop-detected            
            /*
                HttpConfiguration config = GlobalConfiguration.Configuration;
                config.Formatters.JsonFormatter
                            .SerializerSettings
                            .ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                */

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
