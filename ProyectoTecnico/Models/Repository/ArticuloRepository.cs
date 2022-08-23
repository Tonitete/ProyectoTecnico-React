using Microsoft.EntityFrameworkCore;

namespace ProyectoTecnico.Models.Repository
{
    public class ArticuloRepository : IArticuloRepository
    {
        protected readonly ArticuloContext _context;
        public ArticuloRepository(ArticuloContext context)
        {
            _context = context;
        }
        public IEnumerable<Articulo> GetArticulos()
        {
            return _context.Articulos.ToList();
        }

        public Articulo GetArticuloById(int id)
        {
            return _context.Articulos.Find(id);
        }

        public async Task<Articulo> CreateArticuloAsync(Articulo articulo)
        {
            await _context.Set<Articulo>().AddAsync(articulo);
            await _context.SaveChangesAsync();
            return articulo;
        }

        public async Task<bool> UpdateArticuloAsync(Articulo articulo)
        {
            _context.Entry(articulo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteArticuloAsync(Articulo articulo)
        {
            if (articulo == null)
            {
                return false;
            }
            _context.Set<Articulo>().Remove(articulo);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
