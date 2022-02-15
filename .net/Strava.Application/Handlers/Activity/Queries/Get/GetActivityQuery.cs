namespace Strava.Application.Handlers.Activity.Queries.Get
{
    using Domain.Models;
    using MediatR;

    public class GetActivityQuery : IRequest<List<Activity>>
    {
        public GetActivityQuery(long athleteId)
        {
            AthleteId = athleteId;
        }

        public long AthleteId { get; set; }
    }
}