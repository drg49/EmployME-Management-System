using Microsoft.AspNetCore.Mvc;
using System;
using Web.Data;
using Web.Models.ApplicationModels;
using Web.Security;

namespace Web.Controllers
{
    [Route("app/applications")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly EmployMeDBContext context = new EmployMeDBContext();
        private readonly Jwtservice jwtservice = new Jwtservice();

        [HttpPost("create-application")]
        public ActionResult CreateApplication(JobApplication request)
        {
            try
            {
                return Ok();
            } catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
