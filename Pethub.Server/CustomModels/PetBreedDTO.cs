namespace Pethub.Server.CustomModels
{
    public class PetBreedDTO
    {

        public long BreedId { get; set; }

        public long CategoryId { get; set; }

        public string BreedName { get; set; } = null!;

        public string? Description { get; set; }

        public string? OriginCountry { get; set; }

        public string? AverageSize { get; set; }

        public string? AverageWeight { get; set; }

        public string? LifeSpan { get; set; }

        public string? TemperamentTraits { get; set; }

        public string? CareRequirements { get; set; }

        public bool? IsActive { get; set; }

        public DateTime? CreatedAt { get; set; }

    }
}
