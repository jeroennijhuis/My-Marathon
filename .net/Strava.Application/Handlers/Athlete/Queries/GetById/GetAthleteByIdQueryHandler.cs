namespace Strava.Application.Handlers.Athlete.Queries.GetById
{
    using Domain;
    using Domain.Models;
    using MediatR;
    using Microsoft.EntityFrameworkCore;

    public class GetAthleteByIdQueryHandler : IRequestHandler<GetAthleteByIdQuery, Athlete?>
    {
        private readonly StravaContext _dbContext;

        public GetAthleteByIdQueryHandler(StravaContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<Athlete?> Handle(GetAthleteByIdQuery request, CancellationToken cancellationToken)
        {
            return _dbContext.Athletes.SingleOrDefaultAsync(a => a.Id == request.Id, cancellationToken);
        }
    }
}