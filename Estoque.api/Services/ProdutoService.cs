using Estoque.api.Data;
using Estoque.api.DTOs;
using Estoque.api.Models;
using Microsoft.EntityFrameworkCore;

namespace Estoque.api.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly EstoqueDbContext _context;

        public ProdutoService(EstoqueDbContext context)
        {
            _context = context;
        }

        public async Task<Produto> CriarProduto(CriarProdutoDto dto)
        {
            var produto = new Produto
            {
                Descricao = dto.Descricao,
                Saldo = dto.Saldo
            };

            _context.Produto.Add(produto);

            await _context.SaveChangesAsync();

            produto.Codigo = $"PROD-{produto.Id:D6}";

            await _context.SaveChangesAsync();

            return produto;
        }

        public async Task<List<Produto>> ListarProdutos()
        {
            return await _context.Produto.ToListAsync();
        }

        public async Task<Produto?> ObterProduto(int id)
        {
            return await _context.Produto.FindAsync(id);
        }

        public async Task<Produto?> AtualizarProduto(int id, Produto produto)
        {
            var produtoExistente = await _context.Produto.FindAsync(id);

            if (produtoExistente == null)
            {
                return null;
            }

            produtoExistente.Descricao = produto.Descricao;
            produtoExistente.Saldo = produto.Saldo;

            await _context.SaveChangesAsync();

            return produtoExistente;
        }

        public async Task<bool> DeletarProduto(int id)
        {
            var produto = await _context.Produto.FindAsync(id);

            if (produto == null)
            {
                return false;
            }

            _context.Produto.Remove(produto);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Produto?> BaixarEstoque(int id, int quantidade)
        {
            var produto = await _context.Produto.FindAsync(id);

            if (produto == null)
            {
                return null;
            }

            if (quantidade <= 0)
            {
                return null;
            }

            if (produto.Saldo < quantidade)
            {
                return null;
            }

            produto.Saldo -= quantidade;

            await _context.SaveChangesAsync();

            return produto;
        }
    }
}