using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Euroguessr.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "account",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(36)", maxLength: 36, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_account", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "daily_guess_range",
                columns: table => new
                {
                    min_song_id = table.Column<int>(type: "integer", nullable: false),
                    max_song_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_daily_guess_range", x => new { x.min_song_id, x.max_song_id });
                });

            migrationBuilder.CreateTable(
                name: "song",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    year = table.Column<short>(type: "smallint", nullable: false),
                    country = table.Column<string>(type: "text", nullable: false),
                    artist_name = table.Column<string>(type: "text", nullable: false),
                    song_name = table.Column<string>(type: "text", nullable: false),
                    video_id = table.Column<string>(type: "character varying(11)", maxLength: 11, nullable: false),
                    seek_to = table.Column<short>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_song", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "daily_score",
                columns: table => new
                {
                    account_id = table.Column<string>(type: "character varying(36)", maxLength: 36, nullable: false),
                    date = table.Column<DateOnly>(type: "date", nullable: false),
                    attempts = table.Column<int>(type: "integer", nullable: false),
                    win = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_daily_score", x => new { x.account_id, x.date });
                    table.ForeignKey(
                        name: "FK_daily_score_account_account_id",
                        column: x => x.account_id,
                        principalTable: "account",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "daily_guess",
                columns: table => new
                {
                    date = table.Column<DateOnly>(type: "date", nullable: false),
                    song_id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_daily_guess", x => x.date);
                    table.ForeignKey(
                        name: "FK_daily_guess_song_song_id",
                        column: x => x.song_id,
                        principalTable: "song",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "training_score",
                columns: table => new
                {
                    account_id = table.Column<string>(type: "character varying(36)", maxLength: 36, nullable: false),
                    date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    song_id = table.Column<int>(type: "integer", nullable: false),
                    attempts = table.Column<int>(type: "integer", nullable: false),
                    win = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_training_score", x => new { x.account_id, x.date });
                    table.ForeignKey(
                        name: "FK_training_score_account_account_id",
                        column: x => x.account_id,
                        principalTable: "account",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_training_score_song_song_id",
                        column: x => x.song_id,
                        principalTable: "song",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_daily_guess_song_id",
                table: "daily_guess",
                column: "song_id");

            migrationBuilder.CreateIndex(
                name: "IX_training_score_song_id",
                table: "training_score",
                column: "song_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "daily_guess");

            migrationBuilder.DropTable(
                name: "daily_guess_range");

            migrationBuilder.DropTable(
                name: "daily_score");

            migrationBuilder.DropTable(
                name: "training_score");

            migrationBuilder.DropTable(
                name: "account");

            migrationBuilder.DropTable(
                name: "song");
        }
    }
}
