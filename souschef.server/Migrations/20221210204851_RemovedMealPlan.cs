using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace souschef.server.Migrations
{
    public partial class RemovedMealPlan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CookingSession_AspNetUsers_HostId",
                table: "CookingSession");

            migrationBuilder.DropForeignKey(
                name: "FK_CookingSession_MealPlan_MealPlanId",
                table: "CookingSession");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_MealPlan_MealPlanId",
                table: "Recipes");

            migrationBuilder.DropTable(
                name: "MealPlan");

            migrationBuilder.DropIndex(
                name: "IX_CookingSession_MealPlanId",
                table: "CookingSession");

            migrationBuilder.DropColumn(
                name: "MealPlanId",
                table: "CookingSession");

            migrationBuilder.RenameColumn(
                name: "MealPlanId",
                table: "Recipes",
                newName: "CookingSessionId");

            migrationBuilder.RenameIndex(
                name: "IX_Recipes_MealPlanId",
                table: "Recipes",
                newName: "IX_Recipes_CookingSessionId");

            migrationBuilder.AlterColumn<string>(
                name: "HostId",
                table: "CookingSession",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<long>(
                name: "Date",
                table: "CookingSession",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<int>(
                name: "OccasionType",
                table: "CookingSession",
                type: "integer",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CookingSession_AspNetUsers_HostId",
                table: "CookingSession",
                column: "HostId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_CookingSession_CookingSessionId",
                table: "Recipes",
                column: "CookingSessionId",
                principalTable: "CookingSession",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CookingSession_AspNetUsers_HostId",
                table: "CookingSession");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_CookingSession_CookingSessionId",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "OccasionType",
                table: "CookingSession");

            migrationBuilder.RenameColumn(
                name: "CookingSessionId",
                table: "Recipes",
                newName: "MealPlanId");

            migrationBuilder.RenameIndex(
                name: "IX_Recipes_CookingSessionId",
                table: "Recipes",
                newName: "IX_Recipes_MealPlanId");

            migrationBuilder.AlterColumn<string>(
                name: "HostId",
                table: "CookingSession",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "Date",
                table: "CookingSession",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "MealPlanId",
                table: "CookingSession",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MealPlan",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    OccasionType = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealPlan", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CookingSession_MealPlanId",
                table: "CookingSession",
                column: "MealPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_CookingSession_AspNetUsers_HostId",
                table: "CookingSession",
                column: "HostId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CookingSession_MealPlan_MealPlanId",
                table: "CookingSession",
                column: "MealPlanId",
                principalTable: "MealPlan",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_MealPlan_MealPlanId",
                table: "Recipes",
                column: "MealPlanId",
                principalTable: "MealPlan",
                principalColumn: "Id");
        }
    }
}
