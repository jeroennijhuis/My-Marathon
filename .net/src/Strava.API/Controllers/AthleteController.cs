namespace Strava.API.Controllers;

using System.Threading;
using System.Threading.Tasks;
using Application.Handlers.Athlete.Queries.GetById;
using Base;
using Filters.Authentication;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

[Authentication("read")]
[Route("api/[controller]")]
public class AthleteController : AuthenticatedController
{
    private readonly IMediator _mediator;

    public AthleteController(IMediator mediator, IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> Get(CancellationToken cancellationToken)
    {
        var athlete = await _mediator.Send(new GetAthleteByIdQuery(AthleteId), cancellationToken);

        return athlete == null ? NotFound() : Ok(athlete);
    }
}