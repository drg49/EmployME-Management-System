﻿using System;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CompanyName { get; set; }
        public DateTime? UploadDate { get; set; }
    }
}
