namespace Strava.Domain.Migrations;

using System;
using Microsoft.EntityFrameworkCore.Migrations;

public partial class Initial : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Athletes",
            columns: table => new
            {
                Id = table.Column<long>(type: "bigint", nullable: false),
                FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                LastName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                ProfilePicture = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Athletes", x => x.Id);
            });

        migrationBuilder.CreateTable(
            name: "Activities",
            columns: table => new
            {
                Id = table.Column<long>(type: "bigint", nullable: false),
                ActivityType = table.Column<byte>(type: "smallint", nullable: false),
                Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                Distance = table.Column<float>(type: "real", nullable: false),
                MovingTime = table.Column<int>(type: "integer", nullable: false),
                ElapsedTime = table.Column<int>(type: "integer", nullable: false),
                ElevationTotal = table.Column<float>(type: "real", nullable: false),
                ElevationMax = table.Column<float>(type: "real", nullable: false),
                ElevationMin = table.Column<float>(type: "real", nullable: false),
                StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                AchievementCount = table.Column<int>(type: "integer", nullable: false),
                KudosCount = table.Column<int>(type: "integer", nullable: false),
                CommentCount = table.Column<int>(type: "integer", nullable: false),
                AthleteCount = table.Column<int>(type: "integer", nullable: false),
                PhotoCount = table.Column<int>(type: "integer", nullable: false),
                IsPrivate = table.Column<bool>(type: "boolean", nullable: false),
                IsFlagged = table.Column<bool>(type: "boolean", nullable: false),
                AverageSpeed = table.Column<float>(type: "real", nullable: false),
                MaxSpeed = table.Column<float>(type: "real", nullable: false),
                Calories = table.Column<decimal>(type: "numeric", nullable: false),
                DeviceName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                AthleteId = table.Column<long>(type: "bigint", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Activities", x => x.Id);
                table.ForeignKey(
                    name: "FK_Activities_Athletes_AthleteId",
                    column: x => x.AthleteId,
                    principalTable: "Athletes",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "Splits",
            columns: table => new
            {
                ActivityId = table.Column<long>(type: "bigint", nullable: false),
                Type = table.Column<byte>(type: "smallint", nullable: false),
                Index = table.Column<int>(type: "integer", nullable: false),
                AverageSpeed = table.Column<float>(type: "real", nullable: false),
                Distance = table.Column<float>(type: "real", nullable: false),
                MovingTime = table.Column<int>(type: "integer", nullable: false),
                ElapsedTime = table.Column<int>(type: "integer", nullable: false),
                Elevation = table.Column<float>(type: "real", nullable: false),
                PaceZone = table.Column<int>(type: "integer", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Splits", x => new { x.ActivityId, x.Type, x.Index });
                table.ForeignKey(
                    name: "FK_Splits_Activities_ActivityId",
                    column: x => x.ActivityId,
                    principalTable: "Activities",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Activities_AthleteId",
            table: "Activities",
            column: "AthleteId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "Splits");

        migrationBuilder.DropTable(
            name: "Activities");

        migrationBuilder.DropTable(
            name: "Athletes");
    }
}