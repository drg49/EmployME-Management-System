using System.Data.Entity.ModelConfiguration;
using Web.Models;

namespace Web.Data.EF
{
    public class ReminderConfig : EntityTypeConfiguration<Reminder>
    {
        public ReminderConfig()
        {
            this.ToTable("Notifications", "dbo");

            this.HasKey<int>(e => e.ReminderKey);

            this.Property(e => e.ReminderMessage)
                .HasColumnName("NotificationMessage")
                .HasMaxLength(500);

            this.Property(e => e.CheckStatus)
                .HasColumnName("CheckStatus");

            this.Property(e => e.UploadDate)
                .HasColumnName("UploadDate")
                .HasColumnType("datetime");

            this.Property(e => e.UserId)
                .HasColumnName("UserId");
        }
    }
}
