using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoTecnico.Models;
using ProyectoTecnico.Models.Repository;

namespace ProyectoTecnico.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticulosController : ControllerBase
    {
        private IArticuloRepository _articuloRepository;

        public ArticulosController(IArticuloRepository articuloRepository)
        {
            _articuloRepository = articuloRepository;
        }

        // GET: api/Articulos
        [HttpGet]
        [ActionName(nameof(GetArticulosAsync))]
        public IEnumerable<Articulo> GetArticulosAsync()
        {
            return _articuloRepository.GetArticulos();
        }

        // GET: api/Articulos/5
        [HttpGet("{id}")]
        [ActionName(nameof(GetArticuloById))]
        public ActionResult<Articulo> GetArticuloById(int id)
        {
            var articuloById = _articuloRepository.GetArticuloById(id);
            if (articuloById == null)
            {
                return NotFound();
            }
            return articuloById;
        }

        // PUT: api/Articulos/5
        [HttpPut("{id}")]
        [ActionName(nameof(UpdateArticulo))]
        public async Task<ActionResult> UpdateArticulo(int id, Articulo articulo)
        {
            if (id != articulo.Id)
            {
                return BadRequest();
            }
            await _articuloRepository.UpdateArticuloAsync(articulo);
            return NoContent();
        }

        // POST: api/Articulos
        [HttpPost]
        [ActionName(nameof(CreateArticuloAsync))]
        public async Task<ActionResult<Articulo>> CreateArticuloAsync([FromBody]Articulo articulo)
        {
          await _articuloRepository.CreateArticuloAsync(articulo);
            return CreatedAtAction(nameof(GetArticuloById), new { id = articulo.Id }, articulo);
        }

        // DELETE: api/Articulos/5
        [HttpDelete("{id}")]
        [ActionName(nameof(DeleteArticulo))]
        public async Task<IActionResult> DeleteArticulo(int id)
        {
            var articulo = _articuloRepository.GetArticuloById(id);
            if (articulo == null)
            {
                return NotFound();
            }
            await _articuloRepository.DeleteArticuloAsync(articulo);
            return NoContent();
        }

        
    }
}
