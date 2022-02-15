namespace Strava.API.Controllers;

using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Application.Handlers.Athlete.Commands.AddOrUpdate;
using Infrastructure.Services.Strava.Interfaces;
using Infrastructure.Services.Strava.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly IStravaService _stravaService;
    private readonly IMediator _mediator;

    public AuthenticationController(IStravaService stravaService, IMediator mediator)
    {
        _stravaService = stravaService;
        _mediator = mediator;
    }

    /// <summary>
    /// Exchanges the authorization code for an access and refresh token
    /// </summary>
    /// <param name="code">Authorization code</param>
    /// <param name="cancellationToken"></param>
    /// <returns>Access and Refresh tokens</returns>
    [HttpPost]
    public async Task<AccessTokenResponse> Authenticate([FromQuery, Required] string code, CancellationToken cancellationToken)
    {
        var result = await _stravaService.GetAccessTokenAsync(code, cancellationToken);

        var command = AddOrUpdateAthleteCommand.From(result);
        await _mediator.Send(command, cancellationToken);
        
        return result;
    }
}