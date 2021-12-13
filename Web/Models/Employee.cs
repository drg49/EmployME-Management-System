using System;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeKey { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public int Age { get; set; }
        public string Department { get; set; }
        public int Salary { get; set; }
        public DateTime? UploadDate { get; set; }
    }
}
