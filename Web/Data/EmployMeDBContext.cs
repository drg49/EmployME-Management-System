using Microsoft.EntityFrameworkCore;
using Web.Models;
using Microsoft.Extensions.Configuration;
using System;
using Web.Data.EF;
using EF6 = System.Data.Entity;
using Web.Models.ApplicationModels;

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
        public virtual DbSet<JobApplication> JobApplications { get; set; }
        public virtual DbSet<CustomJobAppQuestion> CustomJobAppQuestions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("EmployMeDb"));
            }
        }

        protected void OnModelCreating(EF6.DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new EmployeeConfig());
            modelBuilder.Configurations.Add(new UserConfig());
            modelBuilder.Configurations.Add(new ReminderConfig());
            modelBuilder.Configurations.Add(new JobApplicationConfig());
            modelBuilder.Configurations.Add(new CustomJobAppConfig());
        }
    }
}
