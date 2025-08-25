namespace pethub.Server.CustomModels
{
    public class CreatePetListingDTO
    {
        public long ListingId { get; set; }
        public long SellerId { get; set; }
        public long? ShopId { get; set; }
        public long CategoryId { get; set; }
        public long? BreedId { get; set; }
        public string PetName { get; set; } = null!;
        public string? Description { get; set; }
        public string? Age { get; set; }
        public string? Gender { get; set; }
        public string? Size { get; set; }
        public string? Color { get; set; }
        public decimal Price { get; set; }
        public string? Currency { get; set; }
        public string? Location { get; set; }
        public string? Status { get; set; }
        public bool? IsNegotiable { get; set; }
        public string? HealthStatus { get; set; }
        public string? VaccinationStatus { get; set; }
        public bool? IsNeutered { get; set; }
        public string? SpecialNeeds { get; set; }
    }
}
