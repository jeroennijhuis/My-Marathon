namespace Strava.API.Controllers.Base;

using Filters.Authentication.Constants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

public abstract class AuthenticatedController : ControllerBase
{
    protected AuthenticatedController(IHttpContextAccessor httpContextAccessor)
    {
        AccessToken = httpContextAccessor.HttpContext!.Request.Headers[HttpHeaders.StravaAccessToken];
        if (long.TryParse(httpContextAccessor.HttpContext.Request.Headers[HttpHeaders.StravaAtleteId], out var athleteId))
        {
            AthleteId = athleteId;
        }
    }

    protected string AccessToken { get; }

    protected long AthleteId { get; set; }
}