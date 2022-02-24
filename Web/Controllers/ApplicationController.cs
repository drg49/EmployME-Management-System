using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpGet("get-by-company")]
        public ActionResult<IEnumerable<JobApplication>> GetApplications()
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                User user = jwtService.Verify(jwt);
                var results = from jobApps in context.JobApplications
                              where jobApps.CompanyName == user.CompanyName
                              select jobApps;

                return Ok(results.ToList());
            }
            catch (Exception e)
            {
                return BadRequest("Could not retrieve company job apps");
            }
        }

        [HttpPost("create-application")]
        public ActionResult CreateApplication(JobApplication request)
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                User user = jwtService.Verify(jwt);
                request.UserId = user.UserId;
                request.CompanyName = user.CompanyName;
                request.UploadDate = DateTime.Now;
                JobApplication existingJobTitle = context.JobApplications.FirstOrDefault(j => j.JobTitle.ToUpper() == request.JobTitle.ToUpper());
                JobApplication existingLocation = context.JobApplications.FirstOrDefault(j => j.JobLocation.ToUpper() == request.JobLocation.ToUpper());

                if (existingJobTitle != null && existingLocation != null)
                {
                    return BadRequest($"There is already an application for {existingJobTitle.JobTitle} in {existingLocation.JobLocation}");
                }

                context.JobApplications.Add(request);
                context.SaveChanges();
                return Ok();
            } catch (Exception e)
            {
                return BadRequest("There was an error posting the job application. Please contact customer support.");
            }
        }
    }
}
