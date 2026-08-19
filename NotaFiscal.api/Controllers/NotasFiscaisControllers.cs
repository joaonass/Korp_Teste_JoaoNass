using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotaFiscal.api.Data;
using NotaFiscal.api.DTOs;
using NotaFiscal.api.Models;
using NotaFiscal.api.Clients;
using NotaFiscal.api.Exceptions;

namespace NotaFiscal.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotasFiscaisController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EstoqueClient _estoqueClient;
        public NotasFiscaisController(
        AppDbContext context,
        EstoqueClient estoqueClient)
        {
            _context = context;
            _estoqueClient = estoqueClient;
        }


        [HttpGet]
        public async Task<IActionResult> ListarNotas()
        {
            var notas = await _context.NotasFiscais
                .Include(n => n.Itens)
                .ToListAsync();

            return Ok(notas);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> BuscarNota(int Id)
        {
            var nota = await _context.NotasFiscais
                .Include(n => n.Itens)
                .FirstOrDefaultAsync(n => n.Id ==Id);

            if(nota == null)
            {
                return NotFound(new
                {
                    mensagem = "Nota fiscal não encontrada"
                });
            }
            return Ok(nota);

        }


        [HttpPost]
        public async Task<IActionResult> CriarNota(CriarNotaFiscalDto dto)
        {
            var ultimoCodigo = await _context.NotasFiscais
                .MaxAsync(n => (int?)n.Codigo) ?? 0;

            var novoCodigo = ultimoCodigo + 1;

            var nota = new Models.NotaFiscal
            {
                Codigo = novoCodigo,
                Status = "Aberta"
            };

            foreach (var item in dto.Itens)
            {
                nota.Itens.Add(new ItemNotaFiscal
                {
                    ProdutoId = item.ProdutoId,
                    Quantidade = item.Quantidade
                });
            }

            _context.NotasFiscais.Add(nota);

            await _context.SaveChangesAsync();

            return Ok(nota);
        }

        [HttpPost("{id}/imprimir")]
        public async Task<IActionResult> ImprimirNota(int id)
        {
            var nota = await _context.NotasFiscais
                .Include(n => n.Itens)
                .FirstOrDefaultAsync(n => n.Id == id);

            if (nota == null)
            {
                return NotFound(new
                {
                    mensagem = "Nota fiscal não encontrada."
                });
            }

            if (nota.Status != "Aberta")
            {
                return BadRequest(new
                {
                    mensagem = "A nota fiscal não está aberta."
                });
            }

            try
            {
                foreach (var item in nota.Itens)
                {
                    var produto = await _estoqueClient.ObterProduto(item.ProdutoId);

                    if (produto == null)
                    {
                        return BadRequest(new
                        {
                            mensagem = $"Produto {item.ProdutoId} não encontrado no estoque."
                        });
                    }

                    if (produto.Saldo < item.Quantidade)
                    {
                        return BadRequest(new
                        {
                            mensagem = $"Estoque insuficiente para o produto {item.ProdutoId}."
                        });
                    }
                }

                foreach (var item in nota.Itens)
                {
                    var produto = await _estoqueClient.BaixarEstoque(
                        item.ProdutoId,
                        item.Quantidade);

                    if (produto == null)
                    {
                        return BadRequest(new
                        {
                            mensagem = $"Não foi possível atualizar o estoque do produto {item.ProdutoId}."
                        });
                    }
                }
            }
            catch (EstoqueIndisponivelException)
            {
                return StatusCode(503, new
                {
                    mensagem = "O serviço de estoque está indisponível. Tente novamente mais tarde."
                });
            }

            nota.Status = "Fechada";

            await _context.SaveChangesAsync();

            return Ok(nota);
        }




    }
}
