using System;
using System.ComponentModel.DataAnnotations;

namespace Web.Models.ApplicationModels
{
    public class CustomJobAppQuestion
    {
        [Key]
        public int Id { get; set; }
        public string Question { get; set; }
        public string InputFieldType { get; set; }
        public bool Required { get; set; }
        public DateTime? UploadDate { get; set; }
        public string AppId { get; set; } = string.Empty;
    }
}
