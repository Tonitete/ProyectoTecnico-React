namespace ProyectoTecnico.Models
{
    public class Articulo
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public float Precio { get; set; }
        public string? Familia { get; set; }
    }
}
