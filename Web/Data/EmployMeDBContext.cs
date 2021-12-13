using Microsoft.EntityFrameworkCore;
using Web.Models;
using Microsoft.Extensions.Configuration;
using System;
using Web.Data.EF;
using EF6 = System.Data.Entity;

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
        public virtual DbSet<Reminder> Reminders { get; set; }

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

        protected void OnModelCreating(EF6.DbModelBuilder modelBuilder) //Learn how to export these models to their own class
        {
            modelBuilder.Configurations.Add(new EmployeeConfig());
            modelBuilder.Configurations.Add(new UserConfig());
            modelBuilder.Configurations.Add(new ReminderConfig());
        }
    }
}
