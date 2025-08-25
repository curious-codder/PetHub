using System;
using System.Collections.Generic;

namespace Pethub.Server.Models;

public partial class Notification
{
    public long NotificationId { get; set; }

    public long UserId { get; set; }

    public string Title { get; set; } = null!;

    public string Message { get; set; } = null!;

    public string? NotificationType { get; set; }

    public long? RelatedId { get; set; }

    public string? ActionUrl { get; set; }

    public bool? IsRead { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
