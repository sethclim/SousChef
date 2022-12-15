using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace souschef.server.Migrations
{
    public partial class RenamedDependsOnToDependecies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DependsOn",
                table: "Tasks",
                newName: "Dependencies");

            migrationBuilder.AlterColumn<float>(
                name: "Duration",
                table: "Tasks",
                type: "real",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Dependencies",
                table: "Tasks",
                newName: "DependsOn");

            migrationBuilder.AlterColumn<int>(
                name: "Duration",
                table: "Tasks",
                type: "integer",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }
    }
}
