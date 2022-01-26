using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Data;

namespace Web.Controllers
{
    [Route("app/applications")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        readonly EmployMeDBContext context = new EmployMeDBContext();

        [HttpPost]
        public ActionResult CreateApplication()
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
