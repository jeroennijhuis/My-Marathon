namespace Strava.API;

using System.Threading.Tasks;
using Application.Configuration;
using Application.Handlers;
using Domain;
using Filters.Authentication;
using Infrastructure.Services.Strava;
using Infrastructure.Services.Strava.Configuration;
using Infrastructure.Services.Strava.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;

// TODO EXCEPTION HANDLING MIDDLEWARE
// TODO SEED ACTIVTIES

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public static IConfiguration Configuration { get; private set; }

    // This method gets called by the runtime. Use this method to add services to the container
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        services.Configure<StravaConfiguration>(Configuration.GetSection(StravaConfiguration.Name));
        services.Configure<ApplicationConfiguration>(Configuration.GetSection(ApplicationConfiguration.Name));

        services.AddTransient<IStravaService, StravaService>();
        services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        services.AddDbContextPool<StravaContext>((_, options) =>
        {
            options.UseNpgsql(Configuration.GetValue<string>("Database:ConnectionString"));
        });

        services.AddMediatR(typeof(MediatRAssembly));

        // Register the Swagger services
        services.AddSwaggerDocument(config =>
        {
            config.OperationProcessors.Add(new AddAuthenticationHeaders());

            config.Title = "Strava API";
            config.Version = "1.0";
            config.Description = "API for interacting with the Strava data";
        });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        // Register the Swagger generator and the Swagger UI middlewares
        app.UseOpenApi();
        app.UseSwaggerUi3();
        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapGet("/", context =>
            {
                context.Response.Redirect("./swagger", permanent: false);
                return Task.FromResult(0);
            });
        });
    }
}