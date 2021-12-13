using System.Data.Entity.ModelConfiguration;
using Web.Models;

namespace Web.Data.EF
{
    public class EmployeeConfig : EntityTypeConfiguration<Employee>
    {
        public EmployeeConfig()
        {
            this.ToTable("Employees");

            this.HasKey<int>(e => e.EmployeeKey);

            this.Property(e => e.FirstName)
                    .HasColumnName("FirstName")
                    .HasMaxLength(50);

            this.Property(e => e.LastName)
                    .HasColumnName("LastName")
                    .HasMaxLength(50);

            this.Property(e => e.PhoneNumber)
                    .HasColumnName("PhoneNumber")
                    .HasMaxLength(50);

            this.Property(e => e.Age)
                    .HasColumnName("Age");

            this.Property(e => e.Department)
                    .HasColumnName("Department")
                    .HasMaxLength(50);

            this.Property(e => e.Salary)
                .HasColumnName("Salary");

            this.Property(e => e.UploadDate)
                .HasColumnType("datetime");
        }
    }
}
