using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Web.Data;
using Web.Models;

namespace Web.Controllers
{
    [ApiController]
    [Route("app/employees")]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployMeDBContext context = new EmployMeDBContext();

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return context.Employees.ToList();
        }

        [HttpPost]
        public Employee Create([FromBody] Employee employee)
        {
            context.Employees.Add(employee); // Add to DB
            context.SaveChanges(); // Save to DB
            return employee;
        }
    }
}
