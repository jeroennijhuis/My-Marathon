namespace Strava.Infrastructure.Services.Strava.Models;

using System.Text.Json.Serialization;
using Domain.Models.Enums;

public class Split
{
    /// <summary>
    /// The average speed of this split, in meters per second
    /// </summary>
    [JsonPropertyName("average_speed")]
    public float AverageSpeed { get; set; }

    /// <summary>
    /// The distance of this split, in meters
    /// </summary>
    [JsonPropertyName("distance")]
    public float Distance { get; set; }

    /// <summary>
    /// The elapsed time of this split, in seconds
    /// </summary>
    [JsonPropertyName("elapsed_time")]
    public int ElapsedTime { get; set; }

    /// <summary>
    /// The elevation difference of this split, in meters
    /// </summary>
    [JsonPropertyName("elevation_difference")]
    public float? ElevationDifference { get; set; }

    /// <summary>
    /// The pacing zone of this split
    /// </summary>
    [JsonPropertyName("pace_zone")]
    public int PaceZone { get; set; }

    /// <summary>
    /// The moving time of this split, in seconds
    /// </summary>
    [JsonPropertyName("moving_time")]
    public int MovingTime { get; set; }

    [JsonPropertyName("split")]
    public int SplitIndex { get; set; }

    public Domain.Models.Split ToEntity(SplitType type)
    {
        return new Domain.Models.Split
        {
            AverageSpeed = AverageSpeed,
            Distance = Distance,
            MovingTime = MovingTime,
            ElapsedTime = ElapsedTime,
            Elevation = ElevationDifference,
            Index = SplitIndex,
            PaceZone = PaceZone,
            Type = type
        };
    }
}