namespace Strava.Application.Handlers.Athlete.Commands.Subscribe
{
    using Configuration;
    using Domain;
    using Domain.Models;
    using Infrastructure.Services.Strava.Interfaces;
    using Infrastructure.Services.Strava.Models;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;

    public class SubscribeAthleteCommandHandler : IRequestHandler<SubscribeAthleteCommand, Unit>
    {
        private readonly StravaContext _dbContext;
        private readonly IStravaService _stravaService;
        private readonly ApplicationConfiguration _config;

        public SubscribeAthleteCommandHandler(StravaContext dbContext, IStravaService stravaService, IOptions<ApplicationConfiguration> config)
        {
            _dbContext = dbContext;
            _stravaService = stravaService;
            _config = config.Value;
        }

        public async Task<Unit> Handle(SubscribeAthleteCommand request, CancellationToken cancellationToken)
        {
            var activities = new List<SummaryActivity>();
            for(byte page = 1; page < byte.MaxValue; page++)
            {
                var activitiesResult = await _stravaService.GetActivitiesAsync(request.AccessToken, page, cancellationToken);
                if (activitiesResult.Value.Any())
                {
                    activities.AddRange(activitiesResult.Value);
                    continue;
                }
                break;
            }

            var detailedActivities = new List<DetailedActivity>();

            foreach (var activity in activities) //TODO REMOVE TAKE
            {
                var detailedActivityResult = await _stravaService.GetActivityAsync(request.AccessToken, activity.Id, cancellationToken);

                detailedActivities.Add(detailedActivityResult.Value);

                if (detailedActivityResult.FifteenMinuteRateLimit.Percentage >= _config.RateLimit.FifteenMinuteTreshold 
                    || detailedActivityResult.DailyRateLimit.Percentage >= _config.RateLimit.DailyTreshold)
                {
                    var minutesToSleep = (15 - DateTime.Now.Minute % 15) + 1;
                    Thread.Sleep(TimeSpan.FromMinutes(minutesToSleep));
                }
            }

            var athlete = new Domain.Models.Athlete(request.Id, request.FirstName, request.LastName, request.ProfilePicture);
            athlete.UpdateAuthentication(request.AccessToken, request.RefreshToken, request.AccessTokenExpirationTime);
            athlete.Activities = detailedActivities.Select(d => d.ToEntity()).ToList();

            _dbContext.Add(athlete);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}