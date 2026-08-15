using System.Globalization;

namespace Estoque.api.Models
{
    public class Produto
    {
        public int id { get; set; }
        public string codigo { get; set; } = string.Empty;
        public string descriçao { get; set; } = string.Empty;
        public int saldo { get; set; }
    }
}
