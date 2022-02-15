namespace Strava.Application.Handlers.Athlete.Queries.GetById
{
    using Domain.Models;
    using MediatR;

    public class GetAthleteByIdQuery : IRequest<Athlete?>
    {
        public GetAthleteByIdQuery(long id)
        {
            Id = id;
        }

        public long Id { get; set; }
    }
}