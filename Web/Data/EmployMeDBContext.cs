using Microsoft.EntityFrameworkCore;
using Web.Models;
using Microsoft.Extensions.Configuration;
using System;

namespace Web.Data
{
    public partial class EmployMeDBContext : DbContext
    {
        public EmployMeDBContext()
        {
        }

        public EmployMeDBContext(DbContextOptions<EmployMeDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("employMeDb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) //Learn how to export these models to their own class
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.EmployeeKey)
                    .HasName("Employee_Primary_Key");

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.PhoneNumber).HasMaxLength(50);

                entity.Property(e => e.Age);

                entity.Property(e => e.Department).HasMaxLength(50);

                entity.Property(e => e.Salary);

                entity.Property(e => e.UploadDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("User_Primary_Key");

                entity.HasIndex(e => e.Email)
                    .HasName("Email_Unique_Key")
                    .IsUnique();

                entity.HasIndex(e => e.Username)
                    .HasName("Username_Unique_Key")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.FirstName).HasMaxLength(50)
                    .IsRequired();

                entity.Property(e => e.LastName).HasMaxLength(50)
                    .IsRequired();

                entity.Property(e => e.Username).HasMaxLength(15)
                    .IsRequired();

                entity.Property(e => e.Email).HasMaxLength(320)
                    .IsRequired();

                entity.Property(e => e.Password).HasMaxLength(100)
                    .IsRequired();

                entity.Property(e => e.CompanyName).HasMaxLength(200);

                entity.Property(e => e.UploadDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
