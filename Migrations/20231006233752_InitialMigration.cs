using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Euroguessr.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TodayGuessNumber",
                columns: table => new
                {
                    guess_date = table.Column<DateOnly>(type: "date", nullable: false),
                    today_guess_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodayGuessNumber", x => x.guess_date);
                });

            migrationBuilder.CreateTable(
                name: "TodayGuessNumberRange",
                columns: table => new
                {
                    min_value = table.Column<int>(type: "integer", nullable: false),
                    max_value = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TodayGuessNumberRange", x => new { x.min_value, x.max_value });
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    unique_token = table.Column<string>(type: "character varying(36)", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.unique_token);
                });

            migrationBuilder.CreateTable(
                name: "Score",
                columns: table => new
                {
                    Userunique_token = table.Column<string>(type: "character varying(36)", maxLength: 36, nullable: false),
                    date = table.Column<DateOnly>(type: "date", nullable: false),
                    attempts = table.Column<int>(type: "integer", nullable: false),
                    win = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Score", x => new { x.Userunique_token, x.date });
                    table.ForeignKey(
                        name: "FK_Score_User_Userunique_token",
                        column: x => x.Userunique_token,
                        principalTable: "User",
                        principalColumn: "unique_token",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "TodayGuessNumberRange",
                columns: new[] { "max_value", "min_value" },
                values: new object[] { 528, 503 });

            migrationBuilder.InsertData(
                table: "User",
                column: "unique_token",
                value: "56489489185616");

            migrationBuilder.InsertData(
                table: "Score",
                columns: new[] { "Userunique_token", "date", "attempts", "win" },
                values: new object[] { "56489489185616", new DateOnly(2023, 10, 7), 3, true });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Score");

            migrationBuilder.DropTable(
                name: "TodayGuessNumber");

            migrationBuilder.DropTable(
                name: "TodayGuessNumberRange");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
