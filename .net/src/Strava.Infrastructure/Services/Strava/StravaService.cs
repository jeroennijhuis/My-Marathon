namespace Strava.Infrastructure.Services.Strava;

using System.Collections.Specialized;
using System.Net.Http.Headers;
using System.Web;
using Configuration;
using Helpers;
using Infrastructure.Helpers;
using Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Models;
using Athlete = Models.Athlete;
using DetailedActivity = Models.DetailedActivity;
using SummaryActivity = Models.SummaryActivity;

public class StravaService: StravaClient, IStravaService
{
    private readonly StravaConfiguration _config;

    public StravaService(IOptions<StravaConfiguration> config, ILogger<StravaService> logger) : base(logger)
    {
        _config = config.Value;
        BaseAddress = new Uri("https://www.strava.com/api/v3/");
    }

    public Task<AccessTokenResponse> GetAccessTokenAsync(string code, CancellationToken cancellationToken)
    {
        var request = new HttpRequestMessage(HttpMethod.Post, "oauth/token")
        {
            Content = new FormUrlEncodedContent(
                new Dictionary<string, string>
                {
                    { "client_id", _config.ClientId},
                    { "client_secret", _config.ClientSecret},
                    { "code", code },
                    { "grant_type", "authorization_code"}
                }
            )
        };

        return SendRequestAsync<AccessTokenResponse> (request, cancellationToken);
    }

    public Task<StravaResponse<Athlete>> GetAuthenticatedAthleteAsync(string accessToken, CancellationToken cancellationToken)
    {
        var request = new HttpRequestMessage(HttpMethod.Get, "athlete")
        {
            Headers =
            {
                Authorization = AuthenticationHeaderValue.Parse($"Bearer {accessToken}")
            }
        };

        return SendDataRequestAsync<Athlete>(request, cancellationToken);
    }

    public Task<StravaResponse<List<SummaryActivity>>> GetActivitiesAsync(string accessToken, byte page, CancellationToken cancellationToken)
    {
        var queryString = HttpUtility.ParseQueryString(string.Empty);
        queryString.Add("include_all_efforts", false.ToString());
        queryString.Add("page", page.ToString());
        queryString.Add("per_page", "200");

        var request = new HttpRequestMessage(HttpMethod.Get, $"athlete/activities?{queryString}")
        {
            Headers =
            {
                Authorization = AuthenticationHeaderValue.Parse($"Bearer {accessToken}")
            }
        };

        return SendDataRequestAsync<List<SummaryActivity>>(request, cancellationToken);
    }

    public Task<StravaResponse<DetailedActivity>> GetActivityAsync(string accessToken, long activityId, CancellationToken cancellationToken)
    {
        var queryString = HttpUtility.ParseQueryString(string.Empty);
        queryString.Add("include_all_efforts", false.ToString());

        var request = new HttpRequestMessage(HttpMethod.Get, $"activities/{activityId}?{queryString}")
        {
            Headers =
            {
                Authorization = AuthenticationHeaderValue.Parse($"Bearer {accessToken}")
            },
            
        };

        return SendDataRequestAsync<DetailedActivity>(request, cancellationToken);
    }
}