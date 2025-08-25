using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pethub.Server.CustomModels;
using Pethub.Server.Models;

namespace pethub.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetShopController : ControllerBase
    {

        private readonly PetHubDbContext _context;

        public PetShopController(PetHubDbContext context)
        {
            _context = context;
        }


        [HttpGet("PetShop")]
        public async Task<IActionResult> PetShop()
        {
            return Ok(await _context.PetShops.ToListAsync());
        }

        [HttpPost("AddPetShop")]
        public async Task<ActionResult<PetShopDTO>> AddPetShop([FromBody] PetShopDTO petshopDto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    PetShop petShop = new PetShop();
                    petShop.ShopId = petshopDto.ShopId;
                    petShop.OwnerId = petshopDto.OwnerId;
                    petShop.ShopName = petshopDto.ShopName;
                    petShop.Description = petshopDto.Description;
                    petShop.Address = petshopDto.Address;
                    petShop.City = petshopDto.City;
                    petShop.State = petshopDto.State;
                    petShop.Country = petshopDto.Country;
                    petShop.PostalCode = petshopDto.PostalCode;
                    petShop.PhoneNumber = petshopDto.PhoneNumber;
                    petShop.Email = petshopDto.Email;
                    petShop.Website = petshopDto.Website;
                    petShop.Logo = petshopDto.Logo;
                    petShop.BusinessLicense = petshopDto.BusinessLicense;
                    petShop.TaxId = petshopDto.TaxId;
                    petShop.Rating = petshopDto.Rating;
                    petShop.TotalReviews = petshopDto.TotalReviews;
                    petShop.IsVerified = petshopDto.IsVerified;
                    petShop.IsActive = petshopDto.IsActive;
                    petShop.CreatedAt = petshopDto.CreatedAt;
                    petShop.UpdatedAt = petshopDto.UpdatedAt;


                    _context.PetShops.Add(petShop);
                    await _context.SaveChangesAsync();
                    return Ok(petShop);
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

