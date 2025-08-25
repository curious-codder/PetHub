using System;
using System.Collections.Generic;

namespace Pethub.Server.Models;

public partial class PetCategory
{
    public long CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public string? Description { get; set; }

    public string? IconUrl { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<PetBreed> PetBreeds { get; set; } = new List<PetBreed>();

    public virtual ICollection<PetListing> PetListings { get; set; } = new List<PetListing>();
}
