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
            var petShoplist = await _context.PetShops.Where(c =>c.IsActive == true ).ToListAsync();

            return Ok(petShoplist);
        }

        [HttpPost("AddUpdatePetShop")]
        public async Task<ActionResult<PetShopDTO>> AddUpdatePetShop([FromBody] PetShopDTO petshopDto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    PetShop petShop = new PetShop();
                   
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

                    if(petshopDto.ShopId !=0)
                    {
                        petShop.ShopId = petshopDto.ShopId;
                        _context.PetShops.Update(petShop);
                    }
                    else
                    {
                        _context.PetShops.Add(petShop);
                    }
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
        [HttpDelete("DeletePetShop/{petShopId}")]
        public async Task<IActionResult> DeletePetShop(long petShopId)
        {
            try
            {
                var petShopData = await _context.PetShops.FindAsync(petShopId);

                if (petShopData == null)
                {
                    return NotFound(new { message = "Pet shop not found" });
                }

                PetShop petShop = new PetShop();
                petShop.ShopId = petShopData.ShopId;
                petShop.OwnerId = petShopData.OwnerId;
                petShop.ShopName = petShopData.ShopName;
                petShop.Description = petShopData.Description;
                petShop.Address = petShopData.Address;
                petShop.City = petShopData.City;
                petShop.State = petShopData.State;
                petShop.Country = petShopData.Country;
                petShop.PostalCode = petShopData.PostalCode;
                petShop.PhoneNumber = petShopData.PhoneNumber;
                petShop.Email = petShopData.Email;
                petShop.Website = petShopData.Website;
                petShop.Logo = petShopData.Logo;
                petShop.BusinessLicense = petShopData.BusinessLicense;
                petShop.TaxId = petShopData.TaxId;
                petShop.Rating = petShopData.Rating;
                petShop.TotalReviews = petShopData.TotalReviews;
                petShop.IsActive = petShopData.IsActive;
                petShop.CreatedAt = petShopData.CreatedAt;
                petShop.UpdatedAt = petShopData.UpdatedAt;
                petShop.IsVerified = false;

                _context.PetShops.Update(petShop);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Pet shop deleted successfully" });
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

    }
}

