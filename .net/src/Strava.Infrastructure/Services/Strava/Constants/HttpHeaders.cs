namespace Strava.Infrastructure.Services.Strava.Constants;

public static class HttpHeaders
{
    public static class RateLimit
    {
        public const string Limit = "X-RateLimit-Limit";
        public const string Usage = "X-RateLimit-Usage";
    }
}