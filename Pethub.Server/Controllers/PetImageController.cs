using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pethub.Server.CustomModels;
using Pethub.Server.Models;

namespace Pethub.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetImageController : ControllerBase
    {

        private readonly PetHubDbContext _context;

        public PetImageController(PetHubDbContext context)
        {
            _context = context;
        }


        [HttpGet("PetImageList")]
        public async Task<IActionResult> PetImageList()
        {
            var imageList = await _context.PetImages.ToListAsync();
            return Ok(imageList);
        }

        [HttpPost("AddUpdatePetImage")]
        public async Task<ActionResult<PetImageDTO>> AddUpdatePetImage([FromBody] PetImageDTO image)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    PetImage petImage = new PetImage();

                    petImage.ListingId = image.ListingId;
                    petImage.ImageUrl = image.ImageUrl;
                    petImage.IsPrimary = image.IsPrimary;
                    petImage.Caption = image.Caption;
                    petImage.SortOrder = image.SortOrder;
                    petImage.CreatedAt = image.CreatedAt;


                    if (petImage.ImageId != 0)
                    {
                        petImage.ImageId = image.ImageId;
                        _context.PetImages.Update(petImage);
                    }
                    else
                    {
                        _context.PetImages.Add(petImage);
                    }
                    await _context.SaveChangesAsync();
                    return Ok(petImage);
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
