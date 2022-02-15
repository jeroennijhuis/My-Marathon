namespace Strava.API.Controllers;

using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Handlers.Activity.Queries.Get;
using Application.Handlers.Activity.Queries.GetById;
using Base;
using Filters.Authentication;
using Infrastructure.Services.Strava.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

[Authentication("read")]
[Route("api/[controller]")]
public class ActivityController : AuthenticatedController
{
    private readonly IMediator _mediator;

    public ActivityController(IMediator mediator, IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
        _mediator = mediator;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetActivities(CancellationToken cancellationToken)
    {
        var activities = await _mediator.Send(new GetActivityQuery(AthleteId), cancellationToken);

        return activities.Any()
            ? Ok(activities)
            : NoContent();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetActivity([FromRoute, Required] long id, CancellationToken cancellationToken)
    {
        var activity = await _mediator.Send(new GetActivityByIdQuery(AthleteId, id), cancellationToken);

        return activity == null
            ? NotFound()
            : Ok(activity);
    }
}