using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Estoque.api.Migrations
{
    /// <inheritdoc />
    public partial class CorrigirProduto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "saldo",
                table: "Produto",
                newName: "Saldo");

            migrationBuilder.RenameColumn(
                name: "codigo",
                table: "Produto",
                newName: "Codigo");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Produto",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "descriçao",
                table: "Produto",
                newName: "Descricao");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Saldo",
                table: "Produto",
                newName: "saldo");

            migrationBuilder.RenameColumn(
                name: "Codigo",
                table: "Produto",
                newName: "codigo");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Produto",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Descricao",
                table: "Produto",
                newName: "descriçao");
        }
    }
}
