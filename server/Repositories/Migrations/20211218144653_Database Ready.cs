using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repositories.Migrations
{
    public partial class DatabaseReady : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Type",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Type", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: false),
                    ContractDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreditLimit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsItActive = table.Column<bool>(type: "bit", nullable: false),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customer_Type_TypeId",
                        column: x => x.TypeId,
                        principalTable: "Type",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Type",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "Prospecto" });

            migrationBuilder.InsertData(
                table: "Type",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "Cliente" });

            migrationBuilder.InsertData(
                table: "Customer",
                columns: new[] { "Id", "ContractDate", "CreditLimit", "DeletedDate", "IsItActive", "Name", "TypeId" },
                values: new object[,]
                {
                    { 1, new DateTime(2021, 12, 18, 8, 46, 53, 126, DateTimeKind.Local).AddTicks(3526), 1321m, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "Roberto Solorzano", 1 },
                    { 3, new DateTime(2021, 12, 18, 8, 46, 53, 130, DateTimeKind.Local).AddTicks(2852), 2376m, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "Daniel Webb", 1 },
                    { 2, new DateTime(2021, 12, 18, 8, 46, 53, 130, DateTimeKind.Local).AddTicks(2829), 1722m, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "Kevin Jose Ordoñez Zelaya", 2 },
                    { 4, new DateTime(2021, 12, 18, 8, 46, 53, 130, DateTimeKind.Local).AddTicks(2856), 915m, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "Javier Delgado", 2 },
                    { 5, new DateTime(2021, 12, 18, 8, 46, 53, 130, DateTimeKind.Local).AddTicks(2858), 1431m, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), true, "Dummy Data", 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Customer_TypeId",
                table: "Customer",
                column: "TypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customer");

            migrationBuilder.DropTable(
                name: "Type");
        }
    }
}
