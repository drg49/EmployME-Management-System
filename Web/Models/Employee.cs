using System;
using System.Collections.Generic;

namespace Web.Models
{
    public partial class Employee
    {
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
