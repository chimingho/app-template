using System;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace ngcore3._0 {
  public class Startup {
    public Startup (IConfiguration configuration) {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices (IServiceCollection services) {
      services.AddControllers ();
      services.AddSpaStaticFiles (configuration => {
        configuration.RootPath = "ClientApp/dist";
      });

      // Register the Swagger generator, defining 1 or more Swagger documents
      services.AddSwaggerGen (c => {
        c.SwaggerDoc ("v1", new OpenApiInfo {
          Version = "v1",
            Title = "API",
            Description = "A simple example ASP.NET Core Web API",
            /*
            TermsOfService = new Uri("https://example.com/terms"),
            Contact = new OpenApiContact
            {
                Name = "Shayne Boyer",
                Email = string.Empty,
                Url = new Uri("https://twitter.com/spboyer"),
            },
            License = new OpenApiLicense
            {
                Name = "Use under LICX",
                Url = new Uri("https://example.com/license"),
            }
            */
        });

        // Set the comments path for the Swagger JSON and UI.
        //var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        //var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        //c.IncludeXmlComments(xmlPath);
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
      if (env.IsDevelopment ()) {
        app.UseDeveloperExceptionPage ();
      } else {
        app.UseExceptionHandler ("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts ();
      }

      app.UseHttpsRedirection ();
      app.UseStaticFiles ();
      // Enable middleware to serve generated Swagger as a JSON endpoint.
      app.UseSwagger ();

      // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
      // specifying the Swagger JSON endpoint.
      app.UseSwaggerUI (c => {
        c.SwaggerEndpoint ("/swagger/v1/swagger.json", "My API V1");
      });
      if (!env.IsDevelopment ()) {
        app.UseSpaStaticFiles ();
      }

      app.UseRouting ();

      app.UseEndpoints (endpoints => {
        endpoints.MapControllerRoute (
          name: "default",
          pattern: "{controller}/{action=Index}/{id?}");
      });

      app.UseSpa (spa => {
        // To learn more about options for serving an Angular SPA from ASP.NET Core,
        // see https://go.microsoft.com/fwlink/?linkid=864501

        spa.Options.SourcePath = "ClientApp";

        if (env.IsDevelopment ()) {

          /* launch angular server from .net core cli. 
            drawback => https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/angular?view=aspnetcore-3.0&tabs=netcore-cli  
            */
          //spa.UseAngularCliServer(npmScript: "start");
          //this method will forward incoming request to a a local SPA development server
          spa.UseProxyToSpaDevelopmentServer ("http://localhost:4200");
        }
      });

    }
  }
}