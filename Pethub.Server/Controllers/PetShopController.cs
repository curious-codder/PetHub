using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pethub.Server.CustomModels;
using Pethub.Server.CustomModels;
using Pethub.Server.Models;
using System.Text.Json;

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
   
        [HttpPost("AddUpdateThePetShop")]
     
        public async Task<ActionResult> AddUpdateThePetShop([FromForm] IFormFile? LogoImage, [FromForm] string UserInputData)
        {
            if (ModelState.IsValid)
            {

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                if (string.IsNullOrEmpty(UserInputData))
                    return BadRequest("Important values are missing !!.");


                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                var petshopData = JsonSerializer.Deserialize<PetShop>(UserInputData, options);

                if ((LogoImage == null) && string.IsNullOrEmpty(petshopData.Logo))
                    return BadRequest("Important values are missing !!.");

                var uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "Images", "ShopLogo");
                if (!Directory.Exists(uploadDirectory))
                    Directory.CreateDirectory(uploadDirectory);

                var baseUrl = $"{Request.Scheme}://{Request.Host}";
                var uploadedUrls = "";

                if (LogoImage != null && LogoImage.Length > 0)
                {
                    var uniqueFileName = Guid.NewGuid() + Path.GetExtension(LogoImage.FileName);
                    var filePath = Path.Combine(uploadDirectory, uniqueFileName);
                    var relativePath = $"/Uploads/Images/ShopLogo/{uniqueFileName}";
                    var fileUrl = baseUrl + relativePath;
                    uploadedUrls = fileUrl;
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await LogoImage.CopyToAsync(stream);
                    }
                }
                PetShop petShop = new PetShop();

                petShop.OwnerId = petshopData.OwnerId;
                petShop.ShopName = petshopData.ShopName;
                petShop.Description = petshopData.Description;
                petShop.Address = petshopData.Address;
                petShop.City = petshopData.City;
                petShop.State = petshopData.State;
                petShop.Country = petshopData.Country;
                petShop.PostalCode = petshopData.PostalCode;
                petShop.PhoneNumber = petshopData.PhoneNumber;
                petShop.Email = petshopData.Email;
                petShop.Website = petshopData.Website;
                petShop.BusinessLicense = petshopData.BusinessLicense;
                petShop.TaxId = petshopData.TaxId;
                petShop.Rating = petshopData.Rating;
                petShop.TotalReviews = petshopData.TotalReviews;
                petShop.IsVerified = petshopData.IsVerified;
                petShop.IsActive = true;
                //petShop.Logo = uploadedUrls;

                try
                {
                    if (petshopData.ShopId != 0)
                    {
                        if (!string.IsNullOrEmpty(petshopData.Logo) && uploadedUrls != "")

                        {
                            var oldRelativePath = petshopData.Logo.Replace(baseUrl, "").TrimStart('/');
                            var oldFilePath = Path.Combine(uploadDirectory, Path.GetFileName(oldRelativePath)); 
                            if (System.IO.File.Exists(oldFilePath))
                            {
                                System.IO.File.Delete(oldFilePath);
                            }
                            petShop.Logo = uploadedUrls;
                        }
                        else
                        {
                            petShop.Logo = uploadedUrls;
                        }
                        petShop.CreatedAt = petshopData.CreatedAt;
                        petShop.UpdatedAt = DateTime.Now;
                        petShop.ShopId = petshopData.ShopId;
                        _context.PetShops.Update(petShop);
                    }
                    else
                    {
                        petShop.CreatedAt = DateTime.Now;
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
                petShop.CreatedAt = petShopData.CreatedAt;
                petShop.IsVerified = petShopData.IsActive;
                petShop.IsActive = false;
                petShop.UpdatedAt = DateTime.Now;

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

