namespace Strava.Domain.Mappings;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

public class ActivityMapping : IEntityTypeConfiguration<Activity>
{
    public void Configure(EntityTypeBuilder<Activity> builder)
    {
        builder.HasKey(a => a.Id);

        builder.Property(a => a.Id)
            .IsRequired()
            .ValueGeneratedNever();

        builder.Property(a => a.ActivityType)
            .IsRequired();

        builder.Property(a => a.Name)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(a => a.Distance)
            .IsRequired();

        builder.Property(a => a.MovingTime)
            .IsRequired();

        builder.Property(a => a.ElapsedTime)
            .IsRequired();

        builder.Property(a => a.ElevationTotal)
            .IsRequired();

        builder.Property(a => a.ElevationMax)
            .IsRequired();

        builder.Property(a => a.ElevationMin)
            .IsRequired();

        builder.Property(a => a.StartDate)
            .IsRequired();

        builder.Property(a => a.AchievementCount)
            .IsRequired();

        builder.Property(a => a.KudosCount)
            .IsRequired();

        builder.Property(a => a.CommentCount)
            .IsRequired();

        builder.Property(a => a.AthleteCount)
            .IsRequired();

        builder.Property(a => a.PhotoCount)
            .IsRequired();

        builder.Property(a => a.IsPrivate)
            .IsRequired();

        builder.Property(a => a.IsFlagged)
            .IsRequired();

        builder.Property(a => a.AverageSpeed)
            .IsRequired();

        builder.Property(a => a.MaxSpeed)
            .IsRequired();

        builder.Property(a => a.Calories)
            .IsRequired();

        builder.Property(a => a.DeviceName)
            .HasMaxLength(50)
            .IsRequired();

        builder.HasOne(a => a.Athlete)
            .WithMany(a => a.Activities)
            .IsRequired();

        builder.HasMany(a => a.Splits)
            .WithOne(s => s.Activity)
            .HasForeignKey(s => s.ActivityId);
    }
}