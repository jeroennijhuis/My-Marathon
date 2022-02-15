namespace Strava.Application.Handlers.Activity.Queries.GetById
{
    using Domain;
    using Domain.Models;
    using MediatR;
    using Microsoft.EntityFrameworkCore;

    public class GetActivityByIdQueryHandler : IRequestHandler<GetActivityByIdQuery, Activity?>
    {
        private readonly StravaContext _dbContext;

        public GetActivityByIdQueryHandler(StravaContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<Activity?> Handle(GetActivityByIdQuery request, CancellationToken cancellationToken)
        {
            return _dbContext.Athletes
                .Include(a => a.Activities)
                .Where(a => a.Id == request.AthleteId)
                .SelectMany(a => a.Activities)
                .SingleOrDefaultAsync(a => a.Id == request.Id, cancellationToken);
        }
    }
}