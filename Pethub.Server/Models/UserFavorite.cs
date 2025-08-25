using System;
using System.Collections.Generic;

namespace Pethub.Server.Models;

public partial class UserFavorite
{
    public long FavoriteId { get; set; }

    public long UserId { get; set; }

    public long ListingId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual PetListing Listing { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
