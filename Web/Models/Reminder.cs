using System;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class Reminder
    {
        [Key]
        public int ReminderKey { get; set; }
        public string ReminderMessage { get; set; }
        public DateTime? UploadDate { get; set; }
        public int UserId { get; set; }
    }
}
