using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pethub.Server.CustomModels;
using Pethub.Server.Models;

namespace Pethub.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly PetHubDbContext _context;

        public UserProfileController(PetHubDbContext context)
        {
            _context = context;
        }


        [HttpGet("UserProfileList")]
        public async Task<IActionResult> UserProfileList()
        {
            return Ok(await _context.UserProfiles.ToListAsync());
        }

        [HttpPost("AddUpdateUserFavorites")]
        public async Task<ActionResult<UserProfile>> AddUpdateUserFavorites([FromBody] UserProfileDTO userProf)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    UserProfile profile = new UserProfile();
                    
                    profile.UserId = userProf.UserId;
                    profile.Bio = userProf.Bio;
                    profile.Location = userProf.Location;
                    profile.Website = userProf.Website;
                    profile.SocialMediaLinks = userProf.SocialMediaLinks;
                    profile.PreferredContactMethod = userProf.PreferredContactMethod;
                    profile.CreatedAt = userProf.CreatedAt;
                    profile.UpdatedAt = userProf.UpdatedAt;

                    if(userProf.ProfileId != 0){
                        profile.ProfileId = userProf.ProfileId;
                        _context.UserProfiles.Update(profile);
                    }
                    else
                    {
                        _context.UserProfiles.Add(profile);
                    }
                    await _context.SaveChangesAsync();
                    return Ok(profile);
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
