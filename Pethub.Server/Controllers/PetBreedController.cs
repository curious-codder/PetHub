using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pethub.Server.CustomModels;
using Pethub.Server.Models;

namespace Pethub.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetBreedController : ControllerBase
    {

        private readonly PetHubDbContext _context;

        public PetBreedController(PetHubDbContext context)
        {
            _context = context;
        }


        [HttpGet("PetBreedList")]
        public async Task<IActionResult> PetBreedList()
        {
            var petBreedList = await _context.PetBreeds.Where(c =>c.IsActive ==true).ToListAsync();
            return Ok(petBreedList);
        }

        [HttpPost("AddUpdatePetBreed")]
        public async Task<ActionResult<PetBreedDTO>> AddUpdatePetBreed([FromBody] PetBreedDTO breed)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    PetBreed petbreed = new PetBreed();

                    petbreed.CategoryId = breed.CategoryId;
                    petbreed.BreedName = breed.BreedName;
                    petbreed.Description = breed.Description;
                    petbreed.OriginCountry = breed.OriginCountry;
                    petbreed.AverageSize = breed.AverageSize;
                    petbreed.AverageWeight = breed.AverageWeight;
                    petbreed.LifeSpan = breed.LifeSpan;
                    petbreed.TemperamentTraits = breed.TemperamentTraits;
                    petbreed.CareRequirements = breed.CareRequirements;
                    petbreed.IsActive = breed.IsActive;
                    petbreed.CreatedAt = breed.CreatedAt;


                    if (breed.BreedId != 0)
                    {
                        petbreed.BreedId = breed.BreedId;
                        _context.PetBreeds.Update(petbreed);
                    }
                    else
                    {
                        _context.PetBreeds.Add(petbreed);
                    }
                    await _context.SaveChangesAsync();
                    return Ok(petbreed);
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
