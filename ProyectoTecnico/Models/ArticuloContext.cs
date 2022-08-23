using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace ProyectoTecnico.Models
{
    public class ArticuloContext : DbContext
    {
        public ArticuloContext(DbContextOptions<ArticuloContext> options)
            : base(options) { }

        public DbSet<Articulo> Articulos { get; set; } = null!;
    }
}
