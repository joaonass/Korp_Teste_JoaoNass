namespace NotaFiscal.api.Exceptions
{
    public class EstoqueIndisponivelException : Exception
    {
        public EstoqueIndisponivelException()
            : base("O serviço de estoque está indisponível.")
        {

        }
    }
}
