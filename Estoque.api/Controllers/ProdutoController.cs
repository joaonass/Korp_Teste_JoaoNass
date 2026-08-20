using Estoque.api.DTOs;
using Estoque.api.Models;
using Estoque.api.Services;
using Microsoft.AspNetCore.Mvc;


namespace Estoque.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoService _produtoService;

        public ProdutoController(IProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpPost]
        public async Task<ActionResult<Produto>> CriarProduto(CriarProdutoDto dto)
        {
            var novoProduto = await _produtoService.CriarProduto(dto);

            return CreatedAtAction(
                nameof(ObterProduto),
                new { Id = novoProduto.Id },
                novoProduto
            );
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> ListarProdutos()
        {
            var produtos = await _produtoService.ListarProdutos();

            return Ok(produtos);
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Produto>> ObterProduto(int Id)
        {
            var produto = await _produtoService.ObterProduto(Id);

            if(produto == null)
            {
                return NotFound();
            }
            return Ok(produto);
        }
        [HttpPut("{Id}")]
        public async Task<ActionResult> AtualizarProduto(int Id, Produto produto)
        {
            var produtoExistente = await _produtoService.AtualizarProduto(Id, produto);

            if (produtoExistente == null)
            {
                return NotFound();
            }

            return Ok(produtoExistente);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletarProduto(int id)
        {
            var produtoExcluido =
                await _produtoService.DeletarProduto(id);

            if (!produtoExcluido)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPatch("{Id}/saldo")]
        public async  Task<ActionResult<Produto>> BaixarEstoque(int Id, AtualizarSaldoDto dto)
        {
            var produto = await _produtoService.BaixarEstoque(Id, dto.Quantidade);

            if(produto == null)
            {
                return BadRequest(new { mensagem = "Não foi possivel atualizar o saldo" });
            }
            return Ok(produto);
        }
        
        

    }
}
