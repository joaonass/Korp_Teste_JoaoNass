using Estoque.api.Data;
using Estoque.api.Models;
using Estoque.api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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
        public async Task<ActionResult<Produto>> CriarProduto(Produto produto)
        {
            var novoProduto = await _produtoService.CriarProduto(produto);

            return CreatedAtAction(nameof(ObterProduto), new { Id = novoProduto.Id }, novoProduto);
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

            if(produtoExistente == null)
            {
                return NotFound();
            }
            produtoExistente.Codigo = produto.Codigo;
            produtoExistente.Descricao = produto.Descricao;
            produtoExistente.Saldo = produto.Saldo;

            return Ok(produtoExistente);
        }
        [HttpDelete("{Id}")]
        public async Task<ActionResult>DeleterProduto(int Id)
        {
            var produtoExcluido = await _produtoService.DeletarProduto(Id);
            if(!produtoExcluido)
            {
                return NotFound();
            }

            return NoContent();


        }

    }
}
