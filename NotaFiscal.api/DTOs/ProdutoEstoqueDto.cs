namespace NotaFiscal.api.DTOs
{
    public class ProdutoEstoqueDto
    {
        public int Id { get; set; }
        public string Codigo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public int Saldo { get; set; }
    }
}
