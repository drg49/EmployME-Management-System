﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Data;
using Web.Models;
using Web.Security;

namespace Web.Controllers
{
    [Route("app/reminders")]
    [ApiController]
    public class RemindersController : ControllerBase
    {
        readonly EmployMeDBContext context = new EmployMeDBContext();
        readonly Jwtservice jwtService = new Jwtservice();

        [HttpGet]
        public ActionResult<IEnumerable<Reminder>> GetReminder()
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                var user = jwtService.Verify(jwt);

                var results = from reminders in context.Reminders
                              where reminders.UserId == user.UserId
                              select reminders;
                return Ok(results.ToList());
            }
            catch
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        public IActionResult CreateReminder([FromBody] Reminder newReminder)
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                var authenticatedUser = jwtService.Verify(jwt);

                Reminder reminder = new Reminder()
                {
                    ReminderMessage = newReminder.ReminderMessage,
                    UploadDate = DateTime.Now,
                    UserId = authenticatedUser.UserId
                };

                context.Reminders.Add(reminder);
                context.SaveChanges();

                return Ok(reminder);
            }
            catch(Exception e)
            {
                return Unauthorized();
            }
        }

        [HttpPatch("{reminderKey}")]
        public async Task<IActionResult> UpdateReminderAsync([FromRoute] int reminderKey, [FromBody] Reminder reminder)
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                var authenticatedUser = jwtService.Verify(jwt);

                Reminder reminderToUpdate = await context.Reminders.FindAsync(reminderKey);

                if (reminderToUpdate is null)
                {
                    return NotFound();
                }

                reminderToUpdate.ReminderKey = reminderKey;
                reminderToUpdate.ReminderMessage = reminder.ReminderMessage;
                reminderToUpdate.UploadDate = DateTime.Now;
                reminderToUpdate.UserId = authenticatedUser.UserId;
                context.SaveChanges();
                return Ok(reminderToUpdate);
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
        }

    }
}