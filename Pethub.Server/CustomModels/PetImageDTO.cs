namespace Pethub.Server.CustomModels
{
    public class PetImageDTO
    {
        public long ImageId { get; set; }

        public long ListingId { get; set; }

        public string ImageUrl { get; set; } = null!;

        public bool? IsPrimary { get; set; }

        public string? Caption { get; set; }

        public int? SortOrder { get; set; }

        public DateTime? CreatedAt { get; set; }
    }
}
