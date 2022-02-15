#pragma warning disable CS8618
namespace Strava.Domain.Models;

using Enums;

public class Split
{
    public long ActivityId { get; set; }

    public SplitType Type { get; set; }

    public int Index { get; set; }

    /// <summary>
    /// The average speed of this split, in meters per second
    /// </summary>
    public float AverageSpeed { get; set; }

    /// <summary>
    /// The distance of this split, in meters
    /// </summary>
    public float Distance { get; set; }

    /// <summary>
    /// The moving time of this split, in seconds
    /// </summary>
    public int MovingTime { get; set; }

    /// <summary>
    /// The elapsed time of this split, in seconds
    /// </summary>
    public int ElapsedTime { get; set; }

    /// <summary>
    /// The elevation difference of this split, in meters
    /// </summary>
    public float? Elevation { get; set; }

    /// <summary>
    /// The pacing zone of this split
    /// </summary>
    public int PaceZone { get; set; }

    public Activity Activity { get; set; }
}