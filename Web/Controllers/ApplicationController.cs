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

        // Retrieve job applications by company name & status
        [HttpGet("get-by-company/{status}")]
        public ActionResult<IEnumerable<JobApplication>> GetApplications([FromRoute] string status)
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                User user = jwtService.Verify(jwt);
                var results = from jobApps in context.JobApplications
                              where jobApps.CompanyName == user.CompanyName
                              && jobApps.Status == status
                              select jobApps;

                return Ok(results.ToList());
            }
            catch (Exception e)
            {
                return BadRequest("Could not retrieve company job apps");
            }
        }

        [HttpPost("create-application")]
        public IActionResult CreateApplication([FromBody] JobAppRequest request)
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                User user = jwtService.Verify(jwt);

                var existingJob = from jobApps in context.JobApplications
                                    where jobApps.JobLocation == request.JobLocation &&
                                    jobApps.JobTitle == request.JobTitle
                                    select jobApps;
                var existingJobList = existingJob.ToList();
                if (existingJobList.Count > 0)
                {
                    return BadRequest($"There is already an application for {request.JobTitle} in {request.JobLocation}");
                }
                string appId = Guid.NewGuid().ToString();
                JobApplication jobApp = new JobApplication() 
                {
                    UserId = user.UserId,
                    CompanyName = user.CompanyName,
                    JobTitle = request.JobTitle,
                    JobLocation = request.JobLocation,
                    Description = request.Description,
                    DefaultQuestions = request.DefaultQuestions,
                    UploadDate = DateTime.Now,
                    Status = "Live",
                    AppId = appId,
                };

                List<CustomJobAppQuestion> customJobAppQuestions = request.CustomJobAppQuestions;

                context.JobApplications.Add(jobApp);
                context.SaveChanges();

                foreach (CustomJobAppQuestion q in customJobAppQuestions)
                {
                    q.AppId = appId;
                    q.UploadDate = DateTime.Now;
                    context.CustomJobAppQuestions.Add(q);
                }

                context.SaveChanges();
                return Ok("Application created");
            } catch (Exception e)
            {
                return BadRequest("There was an error posting the job application. Please contact customer support.");
            }
        }

        [HttpGet("get-custom-job-questions/{appId}")]
        public ActionResult<IEnumerable<CustomJobAppQuestion>> GetCustomJobAppQuestions([FromRoute] string appId)
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                User user = jwtService.Verify(jwt);
                var results = from customQuestions in context.CustomJobAppQuestions
                              where customQuestions.AppId == appId
                              select customQuestions;

                return Ok(results.ToList());
            }
            catch (Exception e)
            {
                return BadRequest("Could not retrieve custom job questions");
            }
        }

        [HttpPatch("pause-application/{appId}")]
        public ActionResult PauseApplication([FromRoute] string appId)
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                User user = jwtService.Verify(jwt);
                JobApplication jobAppToPause = context.JobApplications.FirstOrDefault(row => row.AppId == appId);
                jobAppToPause.Status = "Paused";
                context.SaveChanges();
                return Ok("Successfully paused application");

            }
            catch (Exception e)
            {
                return BadRequest("There was an error pausing your application");
            }
        }

        [HttpPatch("resume-application/{appId}")]
        public ActionResult ResumeApplication([FromRoute] string appId)
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                User user = jwtService.Verify(jwt);
                JobApplication jobAppToResume = context.JobApplications.FirstOrDefault(row => row.AppId == appId);
                jobAppToResume.Status = "Live";
                context.SaveChanges();
                return Ok("Successfully resumed application");

            }
            catch (Exception e)
            {
                return BadRequest("There was an error resuming your application");
            }
        }

        [HttpDelete("delete-application/{appId}")]
        public ActionResult DeleteApplication([FromRoute] string appId)
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                User user = jwtService.Verify(jwt);

                IQueryable<CustomJobAppQuestion> customJobAppQuestions = from customQuestions in context.CustomJobAppQuestions
                                                                   where customQuestions.AppId == appId
                                                                   select customQuestions;

                foreach(CustomJobAppQuestion question in customJobAppQuestions)
                {
                    context.CustomJobAppQuestions.Remove(question);
                }

                JobApplication jobAppToDelete = context.JobApplications.FirstOrDefault(row => row.AppId == appId);
                context.JobApplications.Remove(jobAppToDelete);
                context.SaveChanges();
                return Ok("Successfully deleted application");

            }
            catch (Exception e)
            {
                return BadRequest("There was an error deleting your application");
            }
        }
    }
}
