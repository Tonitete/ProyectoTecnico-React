namespace ProyectoTecnico.Models.Repository
{
    public interface IArticuloRepository
    {
        Task<Articulo> CreateArticuloAsync(Articulo articulo);
        Task<bool> DeleteArticuloAsync(Articulo articulo);
        Articulo GetArticuloById(int id);
        IEnumerable<Articulo> GetArticulos();
        Task<bool> UpdateArticuloAsync(Articulo articulo);
    }
}
