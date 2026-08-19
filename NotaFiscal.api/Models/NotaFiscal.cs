namespace NotaFiscal.api.Models
{
    public class NotaFiscal
    {
        public int Id { get; set; }
        public int Codigo { get; set; }
        public string Status { get; set; } = "Aberta";
        public List<ItemNotaFiscal> Itens { get; set; } = new();

    }
}
