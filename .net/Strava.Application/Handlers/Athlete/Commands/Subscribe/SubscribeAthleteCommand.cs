namespace Strava.Application.Handlers.Athlete.Commands.Subscribe
{
    using AddOrUpdate;
    using Infrastructure.Services.Strava.Models;
    using MediatR;

    public class SubscribeAthleteCommand : IRequest<Unit>
    {
        public SubscribeAthleteCommand(long id, string firstName, string lastName, string profilePicture, string accessToken, string refreshToken)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            ProfilePicture = profilePicture;
            AccessToken = accessToken;
            RefreshToken = refreshToken;
        }
        
        public long Id { get; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string ProfilePicture { get; set; }

        public string AccessToken { get; set; }

        public string RefreshToken { get; set; }

        public DateTime AccessTokenExpirationTime { get; set; }
    }
}