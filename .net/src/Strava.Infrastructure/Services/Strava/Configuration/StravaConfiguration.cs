#pragma warning disable CS8618
namespace Strava.Infrastructure.Services.Strava.Configuration;

public class StravaConfiguration
{
    public const string Name = "Strava";

    public string ClientId { get; set; }

    public string ClientSecret { get; set; }
}