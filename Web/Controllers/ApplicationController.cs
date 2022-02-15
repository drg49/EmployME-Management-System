using Microsoft.AspNetCore.Mvc;
using System;
using Web.Data;
using Web.Models;
using Web.Models.ApplicationModels;
using Web.Security;

namespace Web.Controllers
{
    [Route("app/applications")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly EmployMeDBContext context = new EmployMeDBContext();
        private readonly Jwtservice jwtService = new Jwtservice();

        [HttpPost("create-application")]
        public ActionResult CreateApplication(JobApplication request)
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                User user = jwtService.Verify(jwt);
                request.UserId = user.UserId;
                request.CompanyName = user.CompanyName;
                context.JobApplications.Add(request);
                context.SaveChanges();
                return Ok();
            } catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
