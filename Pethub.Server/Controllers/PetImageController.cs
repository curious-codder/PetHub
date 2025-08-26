using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Pethub.Server.CustomModels;
using Pethub.Server.Models;
using System.Text.Json;

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
        public async Task<ActionResult> AddUpdatePetImage([FromForm] List<IFormFile> uploadImages, [FromForm] string UserInputData)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                if (string.IsNullOrEmpty(UserInputData))
                    return BadRequest("Important values are missing !!.");

            //    var imageData = JsonSerializer.Deserialize<PetImageDTO>(UserInputData);
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                var imageData = JsonSerializer.Deserialize<PetImageDTO>(UserInputData, options);

                if ((uploadImages == null || !uploadImages.Any()) && string.IsNullOrEmpty(imageData.ImageUrl))
                    return BadRequest("Important values are missing !!.");

                var uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "Images", "PetListingImages");
                if (!Directory.Exists(uploadDirectory)) 
                    Directory.CreateDirectory(uploadDirectory);

                var baseUrl = $"{Request.Scheme}://{Request.Host}";
                var uploadedUrls = new List<string>();

                // Loop through each uploaded file
                foreach (var file in uploadImages)
                {
                    if (file != null && file.Length > 0)
                    {
                        var uniqueFileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                        var filePath = Path.Combine(uploadDirectory, uniqueFileName);
                        var relativePath = $"/Uploads/Images/PetListingImages/{uniqueFileName}";
                        var fileUrl = baseUrl + relativePath;

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        uploadedUrls.Add(fileUrl);

                        // Save each image as a new DB row
                        var petImage = new PetImage
                        { 
                            ListingId = imageData.ListingId,
                            IsPrimary = imageData.IsPrimary,
                            Caption = imageData.Caption,
                            SortOrder = imageData.SortOrder,
                            CreatedAt = DateTime.UtcNow,
                            ImageUrl = fileUrl
                        };

                        _context.PetImages.Add(petImage);
                    }
                }

                await _context.SaveChangesAsync();
                return Ok(new { UploadedImages = uploadedUrls });
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

        [HttpGet("GetByListingId/{listingId}")]
        public async Task<ActionResult<IEnumerable<PetImageDTO>>> GetByListingId(long listingId)
        {
            try
            {
                var images = await _context.PetImages
                    .Where(i => i.ListingId == listingId)
                    .OrderBy(i => i.SortOrder)
                    .Select(i => new PetImageDTO
                    {
                        ImageId = i.ImageId,
                        ListingId = i.ListingId,
                        IsPrimary = i.IsPrimary,
                        Caption = i.Caption,
                        SortOrder = i.SortOrder,
                        CreatedAt = i.CreatedAt,
                        ImageUrl = i.ImageUrl
                    })
                    .ToListAsync();

                if (!images.Any())
                    return NotFound("No images found for this listing");

                return Ok(images);
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
