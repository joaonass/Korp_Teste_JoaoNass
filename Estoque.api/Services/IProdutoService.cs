using Estoque.api.Models;

namespace Estoque.api.Services
{
    public interface IProdutoService
    {
        Task<Produto> CriarProduto(Produto produto);
        Task<List<Produto>> ListarProdutos();
        Task<Produto?> ObterProduto(int id);
        Task<Produto?> AtualizarProduto(int id, Produto produto);
        Task<bool> DeletarProduto(int id);
    }
}