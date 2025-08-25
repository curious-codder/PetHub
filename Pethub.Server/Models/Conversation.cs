using System;
using System.Collections.Generic;

namespace Pethub.Server.Models;

public partial class Conversation
{
    public long ConversationId { get; set; }

    public long Participant1Id { get; set; }

    public long Participant2Id { get; set; }

    public long? ListingId { get; set; }

    public DateTime? LastMessageAt { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual PetListing? Listing { get; set; }

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual User Participant1 { get; set; } = null!;

    public virtual User Participant2 { get; set; } = null!;
}
