using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pethub.Server.Models;
using System.Diagnostics.Metrics;

namespace pethub.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetCategoriesController : ControllerBase
    {
        private readonly PetHubDbContext _context;

        public PetCategoriesController(PetHubDbContext context)
        {
            _context = context;
        }

        // GET: Category
        [HttpGet("CategoryList")]
        public async Task<IActionResult> CategoryList()
        {
            return Ok(await _context.PetCategories.ToListAsync());
        }

        [HttpPost("AddPetCategory")]
        public async Task<ActionResult<PetCategory>> AddPetCategory([FromBody] PetCategory petCategory)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    
                    _context.PetCategories.Add(petCategory);
                    await _context.SaveChangesAsync();
                   // return CreatedAtAction(nameof(GetByCountryId), new { id = country.CountryId }, country);
                   return Ok(petCategory);
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new
                    {
                        error = ex.Message,
                        innerException = ex.InnerException?.Message
                    });
                }
            }
            return BadRequest(ModelState);
        }

       
    }
}
