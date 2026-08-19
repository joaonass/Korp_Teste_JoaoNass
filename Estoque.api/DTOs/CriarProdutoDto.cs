namespace Estoque.api.DTOs
{
    public class CriarProdutoDto
    {
        public string Descricao { get; set; } = string.Empty;
        public int Saldo { get; set; }
    }
}