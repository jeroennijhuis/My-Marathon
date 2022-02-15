#pragma warning disable CS8618
namespace Strava.Domain;

using Microsoft.EntityFrameworkCore;
using Models;

public class StravaContext : DbContext
{
    public DbSet<Activity> Activities { get; set; }
    public DbSet<Athlete> Athletes { get; set; }
    public DbSet<Split> Splits { get; set; }

    public StravaContext(DbContextOptions<StravaContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
    }
}