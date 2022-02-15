namespace Strava.Domain.Mappings;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

public class AthleteMapping : IEntityTypeConfiguration<Athlete>
{
    public void Configure(EntityTypeBuilder<Athlete> builder)
    {
        builder.HasKey(a => a.Id);

        builder.Property(a => a.Id)
            .IsRequired()
            .ValueGeneratedNever();

        builder.Property(a => a.FirstName)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(a => a.LastName)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(a => a.ProfilePicture)
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(a => a.AccessToken)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(a => a.RefreshToken)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(a => a.AccessTokenExpirationTime)
            .IsRequired();

        builder.HasMany(a => a.Activities)
            .WithOne(a => a.Athlete);
    }
}