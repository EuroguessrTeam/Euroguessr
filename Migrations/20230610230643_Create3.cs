using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Euroguessr.Migrations
{
    public partial class Create3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Surname",
                table: "users",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Surname",
                table: "users");
        }
    }
}
