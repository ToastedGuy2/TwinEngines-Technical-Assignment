using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Repositories.Migrations
{
    public partial class secondMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsItActive",
                table: "Customer",
                newName: "IsActive");

            migrationBuilder.UpdateData(
                table: "Customer",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ContractDate", "CreditLimit" },
                values: new object[] { new DateTime(2021, 12, 19, 21, 53, 20, 671, DateTimeKind.Local).AddTicks(2836), 1549m });

            migrationBuilder.UpdateData(
                table: "Customer",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ContractDate", "CreditLimit" },
                values: new object[] { new DateTime(2021, 12, 19, 21, 53, 20, 675, DateTimeKind.Local).AddTicks(3172), 1184m });

            migrationBuilder.UpdateData(
                table: "Customer",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ContractDate", "CreditLimit" },
                values: new object[] { new DateTime(2021, 12, 19, 21, 53, 20, 675, DateTimeKind.Local).AddTicks(3194), 2340m });

            migrationBuilder.UpdateData(
                table: "Customer",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ContractDate", "CreditLimit" },
                values: new object[] { new DateTime(2021, 12, 19, 21, 53, 20, 675, DateTimeKind.Local).AddTicks(3198), 863m });

            migrationBuilder.UpdateData(
                table: "Customer",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "ContractDate", "CreditLimit" },
                values: new object[] { new DateTime(2021, 12, 19, 21, 53, 20, 675, DateTimeKind.Local).AddTicks(3201), 670m });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsActive",
                table: "Customer",
                newName: "IsItActive");

            migrationBuilder.UpdateData(
                table: "Customer",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ContractDate", "CreditLimit" },
                values: new object[] { new DateTime(2021, 12, 18, 8, 46, 53, 126, DateTimeKind.Local).AddTicks(3526), 1321m });

            migrationBuilder.UpdateData(
                table: "Customer",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ContractDate", "CreditLimit" },
                values: new object[] { new DateTime(2021, 12, 18, 8, 46, 53, 130, DateTimeKind.Local).AddTicks(2829), 1722m });

            migrationBuilder.UpdateData(
                table: "Customer",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ContractDate", "CreditLimit" },
                values: new object[] { new DateTime(2021, 12, 18, 8, 46, 53, 130, DateTimeKind.Local).AddTicks(2852), 2376m });

            migrationBuilder.UpdateData(
                table: "Customer",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "ContractDate", "CreditLimit" },
                values: new object[] { new DateTime(2021, 12, 18, 8, 46, 53, 130, DateTimeKind.Local).AddTicks(2856), 915m });

            migrationBuilder.UpdateData(
                table: "Customer",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "ContractDate", "CreditLimit" },
                values: new object[] { new DateTime(2021, 12, 18, 8, 46, 53, 130, DateTimeKind.Local).AddTicks(2858), 1431m });
        }
    }
}
