using System.Data.Entity.ModelConfiguration;
using Web.Models.ApplicationModels;

namespace Web.Data.EF
{
    public class CustomJobAppConfig : EntityTypeConfiguration<CustomJobAppQuestion>
    {
        public CustomJobAppConfig()
        {
            this.ToTable("CustomJobAppQuestions");

            this.HasKey<int>(e => e.Id);

            this.Property(e => e.Question)
                .HasColumnName("Question")
                .HasMaxLength(200);

            this.Property(e => e.InputFieldType)
                .HasColumnName("InputFieldType")
                .HasMaxLength(20);

            this.Property(e => e.Required)
                .HasColumnName("Required");

            this.Property(e => e.UploadDate)
                .HasColumnName("UploadDate")
                .HasColumnType("datetime");

            this.Property(e => e.AppId)
                .HasColumnName("AppId");
        }
    }
}
