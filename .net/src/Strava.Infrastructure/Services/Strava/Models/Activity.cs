// ReSharper disable UnusedMember.Global
#pragma warning disable CS8618
namespace Strava.Infrastructure.Services.Strava.Models;

using System.Text.Json.Serialization;
using Enums;

public class SummaryActivity
{
    /// <summary>
    /// The unique identifier of the activity
    /// </summary>
    [JsonPropertyName("id")]
    public long Id { get; set; }

    /// <summary>
    /// Type of Activty
    /// </summary>
    [JsonPropertyName("type")]
    public ActivityType ActivityType { get; set; }

    /// <summary>
    /// The name of the activity
    /// </summary>
    [JsonPropertyName("name")]
    public string Name { get; set; }

    /// <summary>
    /// The activity's distance, in meters
    /// </summary>
    [JsonPropertyName("distance")]
    public float Distance { get; set; }

    /// <summary>
    /// The activity's moving time, in seconds
    /// </summary>
    [JsonPropertyName("moving_time")]
    public int MovingTime { get; set; }

    /// <summary>
    /// The activity's elapsed time, in seconds
    /// </summary>
    [JsonPropertyName("elapsed_time")]
    public int ElapsedTime { get; set; }

    /// <summary>
    /// The activity's total elevation gain.
    /// </summary>
    [JsonPropertyName("total_elevation_gain")]
    public float TotalElevationGain { get; set; }

    /// <summary>
    /// The activity's highest elevation, in meters
    /// </summary>
    [JsonPropertyName("elev_high")]
    public float ElevationMax { get; set; }

    /// <summary>
    /// The activity's lowest elevation, in meters
    /// </summary>
    [JsonPropertyName("elev_low")]
    public float ElevationMin { get; set; }

    /// <summary>
    /// The time at which the activity was started.
    /// </summary>
    [JsonPropertyName("start_date")]
    public DateTime StartDate { get; set; }

    /// <summary>
    /// The timezone of the activity.
    /// </summary>
    [JsonPropertyName("timezone")]
    public string Timezone { get; set; }

    /// <summary>
    /// The number of achievements gained during this activity.
    /// </summary>
    [JsonPropertyName("achievement_count")]
    public int AchievementCount { get; set; }

    /// <summary>
    /// The number of kudos given for this activity
    /// </summary>
    [JsonPropertyName("kudos_count")]
    public int KudosCount { get; set; }

    /// <summary>
    /// The number of kudos given for this activity
    /// </summary>
    [JsonPropertyName("comment_count")]
    public int CommentCount { get; set; }

    /// <summary>
    /// The number of athletes for taking part in a group activity
    /// </summary>
    [JsonPropertyName("athlete_count")]
    public int AthleteCount { get; set; }

    /// <summary>
    /// The number of Instagram photos for this activity.
    /// </summary>
    [JsonPropertyName("photo_count")]
    public int PhotoCount { get; set; }

    /// <summary>
    /// The number of Instagram and Strava photos for this activity
    /// </summary>
    [JsonPropertyName("total_photo_count")]
    public int TotalPhotoCount { get; set; }

    /// <summary>
    /// Whether this activity is private
    /// </summary>
    [JsonPropertyName("private")]
    public bool IsPrivate { get; set; }

    /// <summary>
    /// Whether this activity is flagged
    /// </summary>
    [JsonPropertyName("flagged")]
    public bool IsFlagged { get; set; }

    /// <summary>
    /// The activity's average speed, in meters per second
    /// </summary>
    [JsonPropertyName("average_speed")]
    public float AverageSpeed { get; set; }

    /// <summary>
    /// The activity's max speed, in meters per second
    /// </summary>
    [JsonPropertyName("max_speed")]
    public float MaxSpeed { get; set; }
}