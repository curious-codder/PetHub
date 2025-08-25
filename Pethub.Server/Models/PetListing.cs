using System;
using System.Collections.Generic;

namespace Pethub.Server.Models;

public partial class PetListing
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

    public int? ViewCount { get; set; }

    public int? LikeCount { get; set; }

    public DateTime? FeaturedUntil { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual PetBreed? Breed { get; set; }

    public virtual PetCategory Category { get; set; } = null!;

    public virtual ICollection<Conversation> Conversations { get; set; } = new List<Conversation>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual ICollection<PetImage> PetImages { get; set; } = new List<PetImage>();

    public virtual User Seller { get; set; } = null!;

    public virtual PetShop? Shop { get; set; }

    public virtual ICollection<UserFavorite> UserFavorites { get; set; } = new List<UserFavorite>();
}
