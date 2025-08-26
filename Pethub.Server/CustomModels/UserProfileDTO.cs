namespace Pethub.Server.CustomModels
{
    public class UserProfileDTO
    {
        public long ProfileId { get; set; }

        public long UserId { get; set; }

        public string? Bio { get; set; }

        public string? Location { get; set; }

        public string? Website { get; set; }

        public string? SocialMediaLinks { get; set; }

        public string? PreferredContactMethod { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}
