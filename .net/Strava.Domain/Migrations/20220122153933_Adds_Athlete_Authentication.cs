namespace Strava.Domain.Migrations;

using System;
using Microsoft.EntityFrameworkCore.Migrations;

public partial class Adds_Athlete_Authentication : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
            name: "AccessToken",
            table: "Athletes",
            type: "character varying(50)",
            maxLength: 50,
            nullable: false,
            defaultValue: "");

        migrationBuilder.AddColumn<DateTime>(
            name: "AccessTokenExpirationTime",
            table: "Athletes",
            type: "timestamp with time zone",
            nullable: false,
            defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

        migrationBuilder.AddColumn<string>(
            name: "RefreshToken",
            table: "Athletes",
            type: "character varying(50)",
            maxLength: 50,
            nullable: false,
            defaultValue: "");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "AccessToken",
            table: "Athletes");

        migrationBuilder.DropColumn(
            name: "AccessTokenExpirationTime",
            table: "Athletes");

        migrationBuilder.DropColumn(
            name: "RefreshToken",
            table: "Athletes");
    }
}