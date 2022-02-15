namespace Strava.Application.Handlers.Activity.Queries.GetById
{
    using Domain.Models;
    using MediatR;

    public class GetActivityByIdQuery : IRequest<Activity?>
    {
        public GetActivityByIdQuery(long athleteId, long id)
        {
            AthleteId = athleteId;
            Id = id;
        }

        public long AthleteId { get; set; }

        public long Id { get; set; }
    }
}