using Microsoft.EntityFrameworkCore;
using NotaFiscal.api.Models;

namespace NotaFiscal.api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Models.NotaFiscal> NotasFiscais { get; set; }

        public DbSet<ItemNotaFiscal> ItensNotasFiscais { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.NotaFiscal>()
                .HasMany(n => n.Itens)
                .WithOne()
                .HasForeignKey(i => i.NotaFiscalId);

            base.OnModelCreating(modelBuilder);
        }
    }
}