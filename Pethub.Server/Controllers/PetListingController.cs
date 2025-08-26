﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pethub.Server.CustomModels;
using Pethub.Server.Models;

namespace pethub.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetListingController : ControllerBase
    {
        private readonly PetHubDbContext _context;

        public PetListingController(PetHubDbContext context)
        {
            _context = context;
        }


        [HttpGet("PetList")]
        public async Task<IActionResult> PetList()
        {
            var petPosts = await _context.PetListings.Where(c =>c.Status !="Deleted").ToListAsync();
            return Ok(petPosts);
        }

        [HttpPost("AddUpdatePetList")]
        public async Task<ActionResult<PetListing>> AddUpdatePetList([FromBody] CreatePetListingDTO petlistDto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    PetListing petlist = new PetListing ();
                    petlist.ListingId = petlistDto.ListingId;
                    petlist.SellerId = petlistDto.SellerId;
                    petlist.ShopId = petlistDto.ShopId;
                    petlist.CategoryId = petlistDto.CategoryId;
                    petlist.BreedId = petlistDto.BreedId;
                    petlist.PetName = petlistDto.PetName;
                    petlist.Description = petlistDto.Description;
                    petlist.Age = petlistDto.Age;
                    petlist.Gender = petlistDto.Gender;
                    petlist.Size = petlistDto.Size;
                    petlist.Color = petlistDto.Color;
                    petlist.Price = petlistDto.Price;
                    petlist.Currency = petlistDto.Currency;
                    petlist.Location = petlistDto.Location;
                    petlist.Status = petlistDto.Status;
                    petlist.IsNegotiable = petlistDto.IsNegotiable;
                    petlist.HealthStatus = petlistDto.HealthStatus;
                    petlist.VaccinationStatus = petlistDto.VaccinationStatus;
                    petlist.IsNeutered = petlistDto.IsNeutered;
                    petlist.SpecialNeeds = petlistDto.SpecialNeeds;

                    _context.PetListings.Add(petlist);
                    await _context.SaveChangesAsync();
                    return Ok(petlist);
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
        [HttpDelete("DeletePetList/{listingId}")]
        public async Task<IActionResult> DeletePetList(long listingId)
        {
            try
            {
                var petlistDto = await _context.PetListings.FindAsync(listingId);

                if (petlistDto == null)
                {
                    return NotFound(new { message = "Pet listing not found" });
                }

                PetListing petlist = new PetListing();
                petlist.ListingId = petlistDto.ListingId;
                petlist.SellerId = petlistDto.SellerId;
                petlist.ShopId = petlistDto.ShopId;
                petlist.CategoryId = petlistDto.CategoryId;
                petlist.BreedId = petlistDto.BreedId;
                petlist.PetName = petlistDto.PetName;
                petlist.Description = petlistDto.Description;
                petlist.Age = petlistDto.Age;
                petlist.Gender = petlistDto.Gender;
                petlist.Size = petlistDto.Size;
                petlist.Color = petlistDto.Color;
                petlist.Price = petlistDto.Price;
                petlist.Currency = petlistDto.Currency;
                petlist.Location = petlistDto.Location;
                petlist.Status = "Deleted";
                petlist.IsNegotiable = petlistDto.IsNegotiable;
                petlist.HealthStatus = petlistDto.HealthStatus;
                petlist.VaccinationStatus = petlistDto.VaccinationStatus;
                petlist.IsNeutered = petlistDto.IsNeutered;
                petlist.SpecialNeeds = petlistDto.SpecialNeeds;

                _context.PetListings.Update(petlist);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Pet listing deleted successfully" });
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
