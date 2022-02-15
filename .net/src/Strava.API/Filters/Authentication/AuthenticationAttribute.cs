namespace Strava.API.Filters.Authentication;

using System;
using System.Threading.Tasks;
using Application.Handlers.Athlete.Commands.AddOrUpdate;
using Application.Handlers.Athlete.Queries.GetById;
using Constants;
using Infrastructure.Services.Strava.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
public class AuthenticationAttribute : ActionFilterAttribute
{
    public string[] RequiredScopes { get; set; }

    public AuthenticationAttribute(params string[] requiredScopes)
    {
        RequiredScopes = requiredScopes;
    }

    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var isAuthenticated = false;
        var cancellationToken = context.HttpContext.RequestAborted;

        var accessTokenHeader = context.HttpContext.Request.Headers[HttpHeaders.StravaAccessToken];
        var athleteIdHeader = context.HttpContext.Request.Headers[HttpHeaders.StravaAtleteId];

        if (!string.IsNullOrWhiteSpace(accessTokenHeader) && !string.IsNullOrWhiteSpace(athleteIdHeader) && long.TryParse(athleteIdHeader, out var athleteId))
        {
            var mediator = context.HttpContext.RequestServices.GetService<IMediator>()!;
            var dbAthlete = await mediator.Send(new GetAthleteByIdQuery(athleteId), cancellationToken);

            if (dbAthlete != null)
            {
                if (dbAthlete.AccessToken != accessTokenHeader)
                {
                    var stravaService = context.HttpContext.RequestServices.GetService<IStravaService>()!;
                    var stravaAthlete = (await stravaService.GetAuthenticatedAthleteAsync(accessTokenHeader, cancellationToken)).Value;

                    if (stravaAthlete.Id == dbAthlete.Id)
                    {
                        await mediator.Send(new AddOrUpdateAthleteCommand(dbAthlete.Id)
                        {
                            AccessToken = accessTokenHeader
                        }, cancellationToken);

                        // Successfully connected with strava using new access token
                        isAuthenticated = true;
                    }
                }
                else
                {
                    // Accesstoken and athlete ID found in DB
                    isAuthenticated = true;
                }
            }
        }

        if (isAuthenticated)
        {
            await next();
        }
        else
        {
            context.Result = new UnauthorizedResult();
        }
    }
}