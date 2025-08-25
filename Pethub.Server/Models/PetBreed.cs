using System;
using System.Collections.Generic;

namespace Pethub.Server.Models;

public partial class PetBreed
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

    public virtual PetCategory Category { get; set; } = null!;

    public virtual ICollection<PetListing> PetListings { get; set; } = new List<PetListing>();
}
