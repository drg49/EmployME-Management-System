using System;
using System.ComponentModel.DataAnnotations;

namespace Web.Models.ApplicationModels
{
    public class JobApplication
    {
        [Key]
        public int AppId { get; set; }
        public string JobTitle { get; set; }
        public string JobLocation { get; set; }
        public string CompanyName { get; set; }
        public int UserId { get; set; }
        public string DefaultQuestions { get; set; }
        public DateTime? UploadDate { get; set; }
    }
}
