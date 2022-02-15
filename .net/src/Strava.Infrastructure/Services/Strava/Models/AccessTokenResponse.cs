// ReSharper disable UnusedMember.Global
#pragma warning disable CS8618
namespace Strava.Infrastructure.Services.Strava.Models;

using System.Text.Json.Serialization;

public class AccessTokenResponse
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; }

    [JsonPropertyName("expires_at")]
    public long ExpiresAt { get; set; }

    [JsonPropertyName("expires_in")]
    public long ExpiresIn { get; set; }

    [JsonPropertyName("refresh_token")] 
    public string RefreshToken { get; set; }

    [JsonPropertyName("athlete")]
    public Athlete Athlete { get; set; }
}