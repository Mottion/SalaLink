using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalaLink.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Coworking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "coworking",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    short_name = table.Column<string>(type: "character varying(25)", maxLength: 25, nullable: false),
                    cnpj = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    logo = table.Column<string>(type: "text", nullable: true),
                    color_theme_primary = table.Column<string>(type: "character varying(7)", maxLength: 7, nullable: true),
                    color_theme_secondary = table.Column<string>(type: "character varying(7)", maxLength: 7, nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_coworking", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "coworking",
                columns: new[] { "id", "cnpj", "color_theme_primary", "color_theme_secondary", "created_at", "deleted_at", "logo", "name", "short_name", "updated_at" },
                values: new object[] { new Guid("019da83d-9d95-72e7-b588-c11d0ec1bc3a"), "10387298000198", "#FF5733", "#C70039", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, null, "SalaLink", "salalink", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.CreateIndex(
                name: "IX_coworking_short_name",
                table: "coworking",
                column: "short_name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "coworking");
        }
    }
}
