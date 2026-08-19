using Estoque.api.DTOs;
using Estoque.api.Models;

namespace Estoque.api.Services
{
    public interface IProdutoService
    {
        Task<Produto> CriarProduto(CriarProdutoDto dto);
        Task<List<Produto>> ListarProdutos();
        Task<Produto?> ObterProduto(int id);
        Task<Produto?> AtualizarProduto(int id, Produto produto);
        Task<bool> DeletarProduto(int id);
        Task<Produto?> BaixarEstoque(int id, int quantidade);
    }
}