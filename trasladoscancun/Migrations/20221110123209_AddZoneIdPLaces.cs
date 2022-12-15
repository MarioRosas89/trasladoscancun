using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace trasladoscancun.Migrations
{
    public partial class AddZoneIdPLaces : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ZoneId",
                table: "Places",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ZoneId",
                table: "Places");
        }
    }
}
