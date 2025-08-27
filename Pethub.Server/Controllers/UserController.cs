using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pethub.Server.CustomModels;
using Pethub.Server.Models;
using System.Text.Json;

namespace Pethub.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly PetHubDbContext _context;

        public UserController(PetHubDbContext context)
        {
            _context = context;
        }


        [HttpGet("UserList")]
        public async Task<IActionResult> UserList()
        {
            var activeUsers = await _context.Users.Where(c => c.IsActive == true).ToListAsync();
            return Ok(activeUsers);
        }

        [HttpGet("UserByUserId/{userId}")]
        public async Task<IActionResult> UserByUserId(long userId)
        {
            var activeUser = await _context.Users.Where(c => c.IsActive == true && c.UserId == userId).ToListAsync();
            return Ok(activeUser);
        }


        [HttpPost("AddUpdateNewUser")]
        public async Task<ActionResult> AddUpdateNewUser([FromForm] IFormFile? uploadProfileImages, [FromForm] string UserInputData)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrEmpty(UserInputData))
                return BadRequest("Important values are missing !!.");


            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var imageData = JsonSerializer.Deserialize<UserDTO>(UserInputData, options);

            if ((uploadProfileImages == null ) && string.IsNullOrEmpty(imageData.ProfilePicture))
                return BadRequest("Important values are missing !!.");

            var uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", "Images", "ProfileImages");
            if (!Directory.Exists(uploadDirectory))
                Directory.CreateDirectory(uploadDirectory);

            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var uploadedUrls = "";

            if (uploadProfileImages != null && uploadProfileImages.Length > 0)
            {
                var uniqueFileName = Guid.NewGuid() + Path.GetExtension(uploadProfileImages.FileName);
                var filePath = Path.Combine(uploadDirectory, uniqueFileName);
                var relativePath = $"/Uploads/Images/ProfileImages/{uniqueFileName}";
                var fileUrl = baseUrl + relativePath;
                uploadedUrls = fileUrl;
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadProfileImages.CopyToAsync(stream);
                }
            }
            User user = new User();
            user.UserId = imageData.UserId;
            user.Email = imageData.Email;
            user.PasswordHash = imageData.PasswordHash;
            user.FirstName = imageData.FirstName;
            user.LastName = imageData.LastName;
            user.PhoneNumber = imageData.PhoneNumber;
            user.UserType = imageData.UserType;
            user.IsEmailVerified = imageData.IsEmailVerified;
            user.IsActive = true;
            

            user.ProfilePicture = uploadedUrls;

            try
            {
                if (imageData.UserId != 0 && imageData.UserId != null)
                {
                    // Delete old profile image file if exists
                    if (!string.IsNullOrEmpty(imageData.ProfilePicture) && uploadedUrls != "")

                    {
                        var oldRelativePath = imageData.ProfilePicture.Replace(baseUrl, "").TrimStart('/');
                        var oldFilePath = Path.Combine(uploadDirectory, Path.GetFileName(oldRelativePath));
                        if (System.IO.File.Exists(oldFilePath))
                        {
                            System.IO.File.Delete(oldFilePath);
                        }
                        user.ProfilePicture = uploadedUrls;
                    }
                    else
                    {
                        user.ProfilePicture = imageData.ProfilePicture;
                    }
                    user.CreatedAt = imageData.CreatedAt;
                    user.UpdatedAt = DateTime.Now;
                    user.UserId = imageData.UserId;
                    _context.Users.Update(user);
                    await _context.SaveChangesAsync();
                    return Ok();
                }

                user.CreatedAt = DateTime.Now;
                user.ProfilePicture = uploadedUrls;
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }
    }
}
