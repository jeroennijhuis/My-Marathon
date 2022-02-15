namespace Strava.Infrastructure.Services.Strava.Interfaces;

using System.Threading.Tasks;
using Helpers;
using Models;
using Athlete = Models.Athlete;
using DetailedActivity = Models.DetailedActivity;
using SummaryActivity = Models.SummaryActivity;

public interface IStravaService
{
    Task<AccessTokenResponse> GetAccessTokenAsync(string code, CancellationToken cancellationToken);

    Task<StravaResponse<Athlete>> GetAuthenticatedAthleteAsync(string accessToken, CancellationToken cancellationToken);

    Task<StravaResponse<List<SummaryActivity>>> GetActivitiesAsync(string accessToken, byte page, CancellationToken cancellationToken);

    Task<StravaResponse<DetailedActivity>> GetActivityAsync(string accessToken, long activityId, CancellationToken cancellationToken);
}