using System;
using System.Collections.Generic;

namespace Pethub.Server.Models;

public partial class Message
{
    public long MessageId { get; set; }

    public long ConversationId { get; set; }

    public long SenderId { get; set; }

    public long ReceiverId { get; set; }

    public long? ListingId { get; set; }

    public string MessageContent { get; set; } = null!;

    public string? MessageType { get; set; }

    public bool? IsRead { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Conversation Conversation { get; set; } = null!;

    public virtual PetListing? Listing { get; set; }

    public virtual User Receiver { get; set; } = null!;

    public virtual User Sender { get; set; } = null!;
}
