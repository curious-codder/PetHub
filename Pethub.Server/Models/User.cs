using System;
using System.Collections.Generic;

namespace Pethub.Server.Models;

public partial class User
{
    public long UserId { get; set; }

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public string? ProfilePicture { get; set; }

    public string? UserType { get; set; }

    public bool? IsEmailVerified { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Conversation> ConversationParticipant1s { get; set; } = new List<Conversation>();

    public virtual ICollection<Conversation> ConversationParticipant2s { get; set; } = new List<Conversation>();

    public virtual ICollection<Message> MessageReceivers { get; set; } = new List<Message>();

    public virtual ICollection<Message> MessageSenders { get; set; } = new List<Message>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<PetListing> PetListings { get; set; } = new List<PetListing>();

    public virtual ICollection<PetShop> PetShops { get; set; } = new List<PetShop>();

    public virtual ICollection<UserFavorite> UserFavorites { get; set; } = new List<UserFavorite>();

    public virtual ICollection<UserProfile> UserProfiles { get; set; } = new List<UserProfile>();
}
