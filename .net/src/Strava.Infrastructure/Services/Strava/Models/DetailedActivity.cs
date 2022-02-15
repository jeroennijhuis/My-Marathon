// ReSharper disable UnusedMember.Global
#pragma warning disable CS8618
namespace Strava.Infrastructure.Services.Strava.Models;

using System.Text.Json.Serialization;
using Domain.Models;
using Domain.Models.Enums;

public class DetailedActivity : SummaryActivity
{
    /// <summary>
    /// The number of kilocalories consumed during this activity
    /// </summary>
    [JsonPropertyName("calories")]
    public decimal Calories { get; set; }

    /// <summary>
    /// The name of the device used to record the activity
    /// </summary>
    [JsonPropertyName("device_name")]
    public string DeviceName { get; set; }

    /// <summary>
    /// The splits of this activity in metric units (for runs)
    /// </summary>
    [JsonPropertyName("splits_metric")]
    public Split[]? MetricSplits { get; set; }

    /// <summary>
    /// The splits of this activity in imperial units (for runs)
    /// </summary>
    [JsonPropertyName("splits_standard")]
    public Split[]? StandardSplits { get; set; }

    [JsonPropertyName("best_efforts")]
    public DetailedSegmentEffort[] BestEfforts { get; set; }


    public Activity ToEntity()
    {
        var entity = new Activity
        {
            AchievementCount = AchievementCount,
            ActivityType = (ActivityType) ActivityType,
            AthleteCount = AthleteCount,
            AverageSpeed = AverageSpeed,
            Calories = Calories,
            CommentCount = CommentCount,
            DeviceName = DeviceName,
            Distance = Distance,
            ElapsedTime = ElapsedTime,
            ElevationMax = ElevationMax,
            ElevationMin = ElevationMin,
            ElevationTotal = TotalElevationGain,
            Id = Id,
            IsFlagged = IsFlagged,
            IsPrivate = IsPrivate,
            KudosCount = KudosCount,
            MaxSpeed = MaxSpeed,
            MovingTime = MovingTime,
            Name = Name,
            PhotoCount = PhotoCount,
            StartDate = StartDate
        };
        var splits = new List<Domain.Models.Split>();
        if(MetricSplits != null && MetricSplits.Any())
        {
            splits.AddRange(MetricSplits.Select(ms => ms.ToEntity(SplitType.Metric)));
        }

        if(StandardSplits != null)
        {
            splits.AddRange(StandardSplits.Select(ms => ms.ToEntity(SplitType.Standard)));
        }

        entity.Splits = splits;
        return entity;
    }
}