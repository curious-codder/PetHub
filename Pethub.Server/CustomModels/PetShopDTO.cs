//using pethub.Server.Models;

namespace pethub.Server.CustomModels
{
    public class PetShopDTO
    {

        public long ShopId { get; set; }

        public long OwnerId { get; set; }

        public string ShopName { get; set; } = null!;

        public string? Description { get; set; }

        public string? Address { get; set; }

        public string? City { get; set; }

        public string? State { get; set; }

        public string? Country { get; set; }

        public string? PostalCode { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Email { get; set; }

        public string? Website { get; set; }

        public string? Logo { get; set; }

        public string? BusinessLicense { get; set; }

        public string? TaxId { get; set; }

        public decimal? Rating { get; set; }

        public int? TotalReviews { get; set; }

        public bool? IsVerified { get; set; }

        public bool? IsActive { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }
}
