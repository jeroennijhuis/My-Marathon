#pragma warning disable CS8618
namespace Strava.Application.Configuration;

public class ApplicationConfiguration
{
    public const string Name = nameof(ApplicationConfiguration);

    public RateLimit RateLimit { get; set; }
}

public class RateLimit
{
    public int FifteenMinuteTreshold { get; set; }

    public int DailyTreshold { get; set; }
}