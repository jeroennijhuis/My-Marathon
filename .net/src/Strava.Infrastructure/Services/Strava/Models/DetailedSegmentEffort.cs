// ReSharper disable UnusedMember.Global
#pragma warning disable CS8618
namespace Strava.Infrastructure.Services.Strava.Models;

using System.Text.Json.Serialization;

public class DetailedSegmentEffort
{
    /// <summary>
    /// The unique identifier of this effort
    /// </summary>
    [JsonPropertyName("id")]
    public long Id { get; set; }

    /// <summary>
    /// The effort's elapsed time
    /// </summary>
    [JsonPropertyName("elapsed_time")]
    public int ElapsedTime { get; set; }

    /// <summary>
    /// The time at which the effort was started.
    /// </summary>
    [JsonPropertyName("start_date")]
    public DateTime StartDate { get; set; }

    /// <summary>
    /// The time at which the effort was started in the local timezone.
    /// </summary>
    [JsonPropertyName("start_date_local")]
    public DateTime LocalStartDate { get; set; }

    /// <summary>
    /// The effort's distance in meters
    /// </summary>
    [JsonPropertyName("distance")]
    public decimal Distance { get; set; }

    /// <summary>
    /// The name of the segment on which this effort was performed
    /// </summary>
    [JsonPropertyName("name")]
    public string Name { get; set; }

    /// <summary>
    /// The effort's moving time
    /// </summary>
    [JsonPropertyName("moving_time")]
    public int MovingTime { get; set; }

    /// <summary>
    /// The start index of this effort in its activity's stream
    /// </summary>
    [JsonPropertyName("start_index")]
    public int StartIndex { get; set; }

    /// <summary>
    /// The end index of this effort in its activity's stream
    /// </summary>
    [JsonPropertyName("end_index")]
    public int EndIndex { get; set; }
}