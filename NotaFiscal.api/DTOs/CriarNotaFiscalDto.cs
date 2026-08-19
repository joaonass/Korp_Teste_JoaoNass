namespace NotaFiscal.api.DTOs
{
    public class CriarNotaFiscalDto
    {
        public List<ItemNotaFiscalDto> Itens { get; set; } = new();
      
    }
    public class ItemNotaFiscalDto
    {
        public int ProdutoId { get; set; }

        public int Quantidade { get; set; }
    }
}
