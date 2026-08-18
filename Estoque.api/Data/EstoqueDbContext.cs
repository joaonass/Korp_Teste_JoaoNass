using Estoque.api.Models;
using Microsoft.EntityFrameworkCore;

namespace Estoque.api.Data
{
    public class EstoqueDbContext : DbContext
    {
        public EstoqueDbContext(DbContextOptions<EstoqueDbContext> options)
            : base(options)
        {

        }

        public DbSet<Produto> Produto {get; set;}
    }
}
