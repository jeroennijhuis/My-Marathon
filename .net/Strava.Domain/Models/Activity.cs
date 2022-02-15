// ReSharper disable UnusedMember.Global
#pragma warning disable CS8618
namespace Strava.Domain.Models;

using Enums;

public class Activity
{
    /// <summary>
    /// The unique identifier of the activity
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Type of Activty
    /// </summary>
    public ActivityType ActivityType { get; set; }

    /// <summary>
    /// The name of the activity
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// The activity's distance, in meters
    /// </summary>
    public float Distance { get; set; }

    /// <summary>
    /// The activity's moving time, in seconds
    /// </summary>
    public int MovingTime { get; set; }

    /// <summary>
    /// The activity's elapsed time, in seconds
    /// </summary>
    public int ElapsedTime { get; set; }

    /// <summary>
    /// The activity's total elevation gain.
    /// </summary>
    public float ElevationTotal { get; set; }

    /// <summary>
    /// The activity's highest elevation, in meters
    /// </summary>
    public float ElevationMax { get; set; }

    /// <summary>
    /// The activity's lowest elevation, in meters
    /// </summary>
    public float ElevationMin { get; set; }

    /// <summary>
    /// The time at which the activity was started.
    /// </summary>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// The number of achievements gained during this activity.
    /// </summary>
    public int AchievementCount { get; set; }

    /// <summary>
    /// The number of kudos given for this activity
    /// </summary>
    public int KudosCount { get; set; }

    /// <summary>
    /// The number of kudos given for this activity
    /// </summary>
    public int CommentCount { get; set; }

    /// <summary>
    /// The number of athletes for taking part in a group activity
    /// </summary>
    public int AthleteCount { get; set; }

    /// <summary>
    /// The number of Instagram photos for this activity.
    /// </summary>
    public int PhotoCount { get; set; }

    /// <summary>
    /// Whether this activity is private
    /// </summary>
    public bool IsPrivate { get; set; }

    /// <summary>
    /// Whether this activity is flagged
    /// </summary>
    public bool IsFlagged { get; set; }

    /// <summary>
    /// The activity's average speed, in meters per second
    /// </summary>
    public float AverageSpeed { get; set; }

    /// <summary>
    /// The activity's max speed, in meters per second
    /// </summary>
    public float MaxSpeed { get; set; }

    /// <summary>
    /// The number of kilocalories consumed during this activity
    /// </summary>
    public decimal Calories { get; set; }

    /// <summary>
    /// The name of the device used to record the activity
    /// </summary>
    public string DeviceName { get; set; }

    /// <summary>
    /// The splits of this activity (for runs)
    /// </summary>
    public ICollection<Split> Splits { get; set; }

    public Athlete Athlete { get; set; }
}