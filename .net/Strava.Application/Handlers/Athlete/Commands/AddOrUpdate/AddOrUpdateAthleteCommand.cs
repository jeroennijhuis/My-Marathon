namespace Strava.Application.Handlers.Athlete.Commands.AddOrUpdate
{
    using Infrastructure.Services.Strava.Models;
    using MediatR;

    public class AddOrUpdateAthleteCommand : IRequest<Unit>
    {
        public AddOrUpdateAthleteCommand(long id)
        {
            Id = id;
        }
        
        public long Id { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? ProfilePicture { get; set; }

        public string? AccessToken { get; set; }

        public string? RefreshToken { get; set; }

        public DateTime? AccessTokenExpirationTime { get; set; }

        public static AddOrUpdateAthleteCommand From(AccessTokenResponse accessTokenResponse)
        {
            return new AddOrUpdateAthleteCommand(accessTokenResponse.Athlete.Id)
            {
                FirstName = accessTokenResponse.Athlete.FirstName,
                LastName = accessTokenResponse.Athlete.LastName,
                ProfilePicture = accessTokenResponse.Athlete.Profile,
                AccessToken = accessTokenResponse.AccessToken,
                AccessTokenExpirationTime =
                    DateTimeOffset.FromUnixTimeSeconds(accessTokenResponse.ExpiresAt).UtcDateTime,
                RefreshToken = accessTokenResponse.RefreshToken
            };
        }
    }
}