// ReSharper disable UnusedMember.Global
#pragma warning disable CS8618
namespace Strava.Infrastructure.Services.Strava.Models;

using System.Text.Json.Serialization;

public class Athlete
{
    [JsonPropertyName("id")]
    public long Id { get; set; }

    [JsonPropertyName("firstname")]
    public string FirstName { get; set; }

    [JsonPropertyName("lastname")]
    public string LastName { get; set; }

    [JsonPropertyName("profile")]
    public string Profile { get; set; }
}