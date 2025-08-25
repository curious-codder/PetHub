using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pethub.Server.CustomModels;
using Pethub.Server.CustomModels;
using Pethub.Server.Models;

namespace Pethub.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFavoriteController : ControllerBase
    {

        private readonly PetHubDbContext _context;

        public UserFavoriteController(PetHubDbContext context)
        {
            _context = context;
        }


        [HttpGet("UserFavoritesList")]
        public async Task<IActionResult> UserFavoritesList()
        {
            return Ok(await _context.UserFavorites.ToListAsync());
        }

        [HttpPost("AddUserFavorites")]
        public async Task<ActionResult<UserFavorite>> AddUserFavorites([FromBody] UserFavoriteDTO userFav)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    UserFavorite userfavorite = new UserFavorite();
                    userfavorite.FavoriteId = userFav.FavoriteId;
                    userfavorite.ListingId = userFav.ListingId;
                    userfavorite.UserId = userFav.UserId;
                    userfavorite.CreatedAt = userFav.CreatedAt;

                    _context.UserFavorites.Add(userfavorite);
                    await _context.SaveChangesAsync();
                    return Ok(userfavorite);
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
        [HttpDelete("RemoveFavorite/{FavoriteId}")]
        public async Task<IActionResult> RemoveFavorite(long FavoriteId)
        {
            try
            {
                var userFavorite = await _context.UserFavorites.FindAsync(FavoriteId);

                if (userFavorite == null)
                {
                    return NotFound(new { message = "Favorite not found" });
                }

                _context.UserFavorites.Remove(userFavorite);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Favorite Removed successfully" });
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
