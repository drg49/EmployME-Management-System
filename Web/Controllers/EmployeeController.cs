using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;

namespace Web.Controllers
{
    [ApiController]
    [Route("app/employees")]
    public class EmployeeController : ControllerBase
    {
        readonly EmployeeDBContext dbContext = new EmployeeDBContext();

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return dbContext.Employees.ToList();
        }

        [HttpPost]
        public Employee Create([FromBody] Employee employee)
        {
            dbContext.Employees.Add(employee); // Add to DB
            dbContext.SaveChanges(); // Save to DB
            return employee;
        }
    }
}
