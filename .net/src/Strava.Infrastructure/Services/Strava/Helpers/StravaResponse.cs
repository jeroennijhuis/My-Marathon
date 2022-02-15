namespace Strava.Infrastructure.Services.Strava.Helpers;

public class StravaResponse<T>
{
    public StravaResponse(T value, RateLimit fifteenMinuteRateLimit, RateLimit dailyRateLimit)
    {
        Value = value;
        FifteenMinuteRateLimit = fifteenMinuteRateLimit;
        DailyRateLimit = dailyRateLimit;
    }

    public T Value { get; }

    public RateLimit FifteenMinuteRateLimit { get; }

    public RateLimit DailyRateLimit { get; }
}

public class RateLimit
{
    public RateLimit(int limit, int usage)
    {
        Limit = limit;
        Usage = usage;
    }

    public int Limit { get; }
    public int Usage { get; }

    public float Percentage => ((float)Usage / Limit) * 100;

}