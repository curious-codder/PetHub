using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Pethub.Server.Models;

public partial class PetHubDbContext : DbContext
{
    public PetHubDbContext()
    {
    }

    public PetHubDbContext(DbContextOptions<PetHubDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Conversation> Conversations { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<PetBreed> PetBreeds { get; set; }

    public virtual DbSet<PetCategory> PetCategories { get; set; }

    public virtual DbSet<PetImage> PetImages { get; set; }

    public virtual DbSet<PetListing> PetListings { get; set; }

    public virtual DbSet<PetShop> PetShops { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserFavorite> UserFavorites { get; set; }

    public virtual DbSet<UserProfile> UserProfiles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-4KS9IVB;Database=PetHubDev;User Id=sa;Password=123;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Conversation>(entity =>
        {
            entity.HasKey(e => e.ConversationId).HasName("PK__Conversa__C050D877B06E6643");

            entity.HasIndex(e => new { e.Participant1Id, e.Participant2Id, e.ListingId }, "unique_participants_listing").IsUnique();

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.LastMessageAt).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Listing).WithMany(p => p.Conversations)
                .HasForeignKey(d => d.ListingId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Conversat__Listi__503BEA1C");

            entity.HasOne(d => d.Participant1).WithMany(p => p.ConversationParticipant1s)
                .HasForeignKey(d => d.Participant1Id)
                .HasConstraintName("FK__Conversat__Parti__4E53A1AA");

            entity.HasOne(d => d.Participant2).WithMany(p => p.ConversationParticipant2s)
                .HasForeignKey(d => d.Participant2Id)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Conversat__Parti__4F47C5E3");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.MessageId).HasName("PK__Messages__C87C0C9C20905B29");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IsRead).HasDefaultValue(false);
            entity.Property(e => e.MessageType)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("Text");

            entity.HasOne(d => d.Conversation).WithMany(p => p.Messages)
                .HasForeignKey(d => d.ConversationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Messages__Conver__5F7E2DAC");

            entity.HasOne(d => d.Listing).WithMany(p => p.Messages)
                .HasForeignKey(d => d.ListingId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Messages__Listin__625A9A57");

            entity.HasOne(d => d.Receiver).WithMany(p => p.MessageReceivers)
                .HasForeignKey(d => d.ReceiverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Messages__Receiv__6166761E");

            entity.HasOne(d => d.Sender).WithMany(p => p.MessageSenders)
                .HasForeignKey(d => d.SenderId)
                .HasConstraintName("FK__Messages__Sender__607251E5");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotificationId).HasName("PK__Notifica__20CF2E1288D52F0F");

            entity.Property(e => e.ActionUrl)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IsRead).HasDefaultValue(false);
            entity.Property(e => e.NotificationType)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.User).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Notificat__UserI__681373AD");
        });

        modelBuilder.Entity<PetBreed>(entity =>
        {
            entity.HasKey(e => e.BreedId).HasName("PK__PetBreed__D1E9AE9D69750AF7");

            entity.Property(e => e.AverageSize)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.AverageWeight)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.BreedName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.LifeSpan)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.OriginCountry)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Category).WithMany(p => p.PetBreeds)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__PetBreeds__Categ__5629CD9C");
        });

        modelBuilder.Entity<PetCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__PetCateg__19093A0B00424734");

            entity.HasIndex(e => e.CategoryName, "UQ__PetCateg__8517B2E0532D1CD9").IsUnique();

            entity.Property(e => e.CategoryName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.IconUrl)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
        });

        modelBuilder.Entity<PetImage>(entity =>
        {
            entity.HasKey(e => e.ImageId).HasName("PK__PetImage__7516F70C22EF5917");

            entity.Property(e => e.Caption)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.IsPrimary).HasDefaultValue(false);
            entity.Property(e => e.SortOrder).HasDefaultValue(0);

            entity.HasOne(d => d.Listing).WithMany(p => p.PetImages)
                .HasForeignKey(d => d.ListingId)
                .HasConstraintName("FK__PetImages__Listi__31B762FC");
        });

        modelBuilder.Entity<PetListing>(entity =>
        {
            entity.HasKey(e => e.ListingId).HasName("PK__PetListi__BF3EBED071AFF580");

            entity.Property(e => e.Age)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Color)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Currency)
                .HasMaxLength(3)
                .IsUnicode(false)
                .HasDefaultValue("USD");
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasDefaultValue("Unknown");
            entity.Property(e => e.HealthStatus)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IsNegotiable).HasDefaultValue(false);
            entity.Property(e => e.LikeCount).HasDefaultValue(0);
            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PetName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Size)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("Medium");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("Available");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.VaccinationStatus)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ViewCount).HasDefaultValue(0);

            entity.HasOne(d => d.Breed).WithMany(p => p.PetListings)
                .HasForeignKey(d => d.BreedId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__PetListin__Breed__2BFE89A6");

            entity.HasOne(d => d.Category).WithMany(p => p.PetListings)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PetListin__Categ__2B0A656D");

            entity.HasOne(d => d.Seller).WithMany(p => p.PetListings)
                .HasForeignKey(d => d.SellerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PetListin__Selle__29221CFB");

            entity.HasOne(d => d.Shop).WithMany(p => p.PetListings)
                .HasForeignKey(d => d.ShopId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__PetListin__ShopI__2A164134");
        });

        modelBuilder.Entity<PetShop>(entity =>
        {
            entity.HasKey(e => e.ShopId).HasName("PK__PetShops__67C557C954AFB525");

            entity.Property(e => e.Address)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.BusinessLicense)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Country)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsVerified).HasDefaultValue(false);
            entity.Property(e => e.Logo)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.PostalCode)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Rating)
                .HasDefaultValue(0.00m)
                .HasColumnType("decimal(3, 2)");
            entity.Property(e => e.ShopName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.State)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.TaxId)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.TotalReviews).HasDefaultValue(0);
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Website)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.Owner).WithMany(p => p.PetShops)
                .HasForeignKey(d => d.OwnerId)
                .HasConstraintName("FK__PetShops__OwnerI__4CA06362");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4CC37FE2E2");

            entity.HasIndex(e => e.Email, "UQ__Users__A9D10534AFBE4F6E").IsUnique();

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.IsEmailVerified).HasDefaultValue(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.ProfilePicture)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.UserType)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("Individual");
        });

        modelBuilder.Entity<UserFavorite>(entity =>
        {
            entity.HasKey(e => e.FavoriteId).HasName("PK__UserFavo__CE74FAD5CD066A34");

            entity.HasIndex(e => new { e.UserId, e.ListingId }, "unique_user_listing").IsUnique();

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Listing).WithMany(p => p.UserFavorites)
                .HasForeignKey(d => d.ListingId)
                .HasConstraintName("FK__UserFavor__Listi__37703C52");

            entity.HasOne(d => d.User).WithMany(p => p.UserFavorites)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__UserFavor__UserI__367C1819");
        });

        modelBuilder.Entity<UserProfile>(entity =>
        {
            entity.HasKey(e => e.ProfileId).HasName("PK__UserProf__290C88E412889EF4");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.PreferredContactMethod)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("Message");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.Website)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.User).WithMany(p => p.UserProfiles)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__UserProfi__UserI__440B1D61");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
