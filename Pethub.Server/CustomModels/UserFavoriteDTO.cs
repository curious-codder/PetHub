namespace Pethub.Server.CustomModels
{
    public class UserFavoriteDTO
    {
        public long FavoriteId { get; set; }

        public long UserId { get; set; }

        public long ListingId { get; set; }

        public DateTime? CreatedAt { get; set; }
    }
}
