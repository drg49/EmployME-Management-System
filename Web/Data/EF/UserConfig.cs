using System.Data.Entity.ModelConfiguration;
using Web.Models;

namespace Web.Data.EF
{
    public class UserConfig : EntityTypeConfiguration<User>
    {
        public UserConfig()
        {
            this.ToTable("Users", "dbo");

            this.HasKey<int>(e => e.UserId);

            this.Property(e => e.FirstName)
                    .HasColumnName("FirstName")
                    .HasMaxLength(50);

            this.Property(e => e.LastName)
                    .HasColumnName("LastName")
                    .HasMaxLength(50);

            this.Property(e => e.Username)
                    .HasColumnName("Username")
                    .HasMaxLength(15);

            this.Property(e => e.Email)
                    .HasColumnName("Email")
                    .HasMaxLength(320);

            this.Property(e => e.Password)
                   .HasColumnName("Password")
                   .HasMaxLength(100);

            this.Property(e => e.CompanyName)
                   .HasColumnName("CompanyName")
                   .HasMaxLength(150);

            this.Property(e => e.UploadDate)
                .HasColumnType("datetime");
        }
    }
}
