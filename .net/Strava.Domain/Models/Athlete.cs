// ReSharper disable UnusedMember.Global
#pragma warning disable CS8618
namespace Strava.Domain.Models;

public class Athlete
{
    public Athlete(long id, string firstName, string lastName, string profilePicture)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        ProfilePicture = profilePicture;
    }

    public void UpdateAuthentication(string accessToken, string refreshToken, DateTime accessTokenExpirationTime)
    {
        AccessToken = accessToken;
        RefreshToken = refreshToken;
        AccessTokenExpirationTime = accessTokenExpirationTime;
    }

    public long Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string ProfilePicture { get; set; }

    public string AccessToken { get; set; }

    public string RefreshToken { get; set; }

    public DateTime AccessTokenExpirationTime { get; set; }

    public ICollection<Activity> Activities { get; set; }
}