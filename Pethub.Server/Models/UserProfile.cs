using System;
using System.Collections.Generic;

namespace Pethub.Server.Models;

public partial class UserProfile
{
    public long ProfileId { get; set; }

    public long UserId { get; set; }

    public string? Bio { get; set; }

    public string? Location { get; set; }

    public string? Website { get; set; }

    public string? SocialMediaLinks { get; set; }

    public string? PreferredContactMethod { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
