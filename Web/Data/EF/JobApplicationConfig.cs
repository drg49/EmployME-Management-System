﻿using System.Data.Entity.ModelConfiguration;
using Web.Models.ApplicationModels;

namespace Web.Data.EF
{
    public class JobApplicationConfig : EntityTypeConfiguration<JobApplication>
    {
        public JobApplicationConfig()
        {
            this.ToTable("JobApplications");

            this.HasKey<int>(e => e.AppId);

            this.Property(e => e.JobQuestions)
                    .HasColumnName("JobQuestions");

            this.Property(e => e.CompanyName)
                    .HasColumnName("CompanyName")
                    .HasMaxLength(150);

            this.Property(e => e.JobLocation)
                    .HasColumnName("JobLocation")
                    .HasMaxLength(150);

            this.Property(e => e.JobTitle)
                    .HasColumnName("JobTitle")
                    .HasMaxLength(150);

            this.Property(e => e.UserId)
                    .HasColumnName("UserId");

            this.Property(e => e.UploadDate)
                .HasColumnType("datetime");
        }
    }
}