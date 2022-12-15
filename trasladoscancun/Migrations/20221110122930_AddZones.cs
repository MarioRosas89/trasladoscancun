using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace trasladoscancun.Migrations
{
    public partial class AddZones : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ToIdPlace",
                table: "Tickets",
                newName: "ToIdZone");

            migrationBuilder.RenameColumn(
                name: "FromIdPlace",
                table: "Tickets",
                newName: "FromIdZone");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ToIdZone",
                table: "Tickets",
                newName: "ToIdPlace");

            migrationBuilder.RenameColumn(
                name: "FromIdZone",
                table: "Tickets",
                newName: "FromIdPlace");
        }
    }
}
