namespace Strava.Application.Handlers.Athlete.Commands.AddOrUpdate
{
    using Domain;
    using Domain.Models;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Subscribe;

    public class AddOrUpdateAthleteCommandHandler : IRequestHandler<AddOrUpdateAthleteCommand, Unit>
    {
        private readonly StravaContext _dbContext;
        private readonly IMediator _mediator;

        public AddOrUpdateAthleteCommandHandler(StravaContext dbContext, IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(AddOrUpdateAthleteCommand request, CancellationToken cancellationToken)
        {
            var athlete = await _dbContext.Athletes.SingleOrDefaultAsync(a => a.Id == request.Id, cancellationToken);

            if (athlete != null)
            {
                athlete.FirstName = request.FirstName ?? athlete.FirstName;
                athlete.LastName = request.LastName ?? athlete.LastName;
                athlete.ProfilePicture = request.ProfilePicture ?? athlete.ProfilePicture;
                athlete.AccessToken = request.AccessToken ?? athlete.AccessToken;
                athlete.AccessTokenExpirationTime =
                    request.AccessTokenExpirationTime ?? athlete.AccessTokenExpirationTime;
                athlete.RefreshToken = request.RefreshToken ?? athlete.RefreshToken;

                _dbContext.Update(athlete);
                await _dbContext.SaveChangesAsync(cancellationToken);
            }
            else
            {
                await _mediator.Send(new SubscribeAthleteCommand(request.Id, request.FirstName ?? string.Empty, request.LastName ?? string.Empty, request.ProfilePicture ?? string.Empty, request.AccessToken ?? string.Empty, request.RefreshToken ?? string.Empty), cancellationToken);
            }

            return Unit.Value;
        }
    }
}