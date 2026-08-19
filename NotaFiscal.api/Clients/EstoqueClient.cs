
using NotaFiscal.api.DTOs;
using NotaFiscal.api.Exceptions;

namespace NotaFiscal.api.Clients
{
    public class EstoqueClient
    {
        private readonly HttpClient _httpClient;

        public EstoqueClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<ProdutoEstoqueDto?> ObterProduto(int produtoId)
        {
            try
            {
                var response = await _httpClient.GetAsync(
                    $"api/Produto/{produtoId}");

                if (!response.IsSuccessStatusCode)
                {
                    return null;
                }

                return await response.Content
                    .ReadFromJsonAsync<ProdutoEstoqueDto>();
            }
            catch (HttpRequestException)
            {
                throw new EstoqueIndisponivelException();
            }
            catch (TaskCanceledException)
            {
                throw new EstoqueIndisponivelException();
            }
        }

        public async Task<ProdutoEstoqueDto?> BaixarEstoque(
    int produtoId,
    int quantidade)
        {
            try
            {
                var response = await _httpClient.PatchAsJsonAsync(
                    $"api/Produto/{produtoId}/saldo",
                    new { quantidade });

                if (!response.IsSuccessStatusCode)
                {
                    return null;
                }

                return await response.Content
                    .ReadFromJsonAsync<ProdutoEstoqueDto>();
            }
            catch (HttpRequestException)
            {
                throw new EstoqueIndisponivelException();
            }
            catch (TaskCanceledException)
            {
                throw new EstoqueIndisponivelException();
            }
        }
    }
}