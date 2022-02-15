namespace Strava.Domain.Mappings;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

public class SplitMapping : IEntityTypeConfiguration<Split>
{
    public void Configure(EntityTypeBuilder<Split> builder)
    {
        builder.HasKey(s => new { s.ActivityId, s.Type, s.Index });

        builder.Property(s => s.AverageSpeed)
            .IsRequired();

        builder.Property(s => s.Distance)
            .IsRequired();

        builder.Property(s => s.MovingTime)
            .IsRequired();

        builder.Property(s => s.ElapsedTime)
            .IsRequired();

        builder.Property(s => s.Elevation);

        builder.Property(s => s.PaceZone)
            .IsRequired();

        builder.HasOne(s => s.Activity)
            .WithMany(a => a.Splits);
    }
}