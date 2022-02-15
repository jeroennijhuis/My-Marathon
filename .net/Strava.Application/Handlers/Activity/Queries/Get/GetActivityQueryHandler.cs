namespace Strava.Application.Handlers.Activity.Queries.Get
{
    using Domain;
    using Domain.Models;
    using MediatR;
    using Microsoft.EntityFrameworkCore;

    public class GetActivityQueryHandler : IRequestHandler<GetActivityQuery, List<Activity>>
    {
        private readonly StravaContext _dbContext;

        public GetActivityQueryHandler(StravaContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<List<Activity>> Handle(GetActivityQuery request, CancellationToken cancellationToken)
        {
            return _dbContext.Athletes
                .Include(a => a.Activities)
                .Where(a => a.Id == request.AthleteId)
                .SelectMany(a => a.Activities)
                .ToListAsync(cancellationToken);
        }
    }
}