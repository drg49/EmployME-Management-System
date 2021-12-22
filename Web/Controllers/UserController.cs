using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Web.Security;
using Web.Data;
using Web.Models;
using System;

namespace Web.Controllers
{
    [Route("app/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        readonly EmployMeDBContext context = new EmployMeDBContext();
        readonly Validator validator = new Validator();
        readonly Jwtservice jwtService = new Jwtservice();

        [HttpPost("register")]
        public IActionResult Register([FromBody] User newUser)
        {
            User existingEmail = context.Users.FirstOrDefault(u => u.Email == newUser.Email);
            User existingUser = context.Users.FirstOrDefault(u => u.Username == newUser.Username);

            if (existingEmail != null)
            {
                return StatusCode(400, "Email already exists");
            }
            else if (existingUser != null)
            {
                return StatusCode(400, "Username already exists");
            }
            else if (!validator.ValidateEmail(newUser.Email))
            {
                return StatusCode(400, "Issue validating email");
            }

            User _newUser = new User();
            _newUser.FirstName = newUser.FirstName;
            _newUser.LastName = newUser.LastName;
            _newUser.Username = newUser.Username;
            _newUser.Email = newUser.Email;
            _newUser.UploadDate = DateTime.Now;
            _newUser.Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password);
            _newUser.CompanyName = newUser.CompanyName;

            try
            {
                context.Users.Add(_newUser);
                context.SaveChanges();
                return Created("New user successfully added", _newUser);
            }
            catch
            {
                return StatusCode(400, "An error occured processing your request");
            }

        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginAttempt)
        {
            User existingEmail = context.Users.FirstOrDefault(u => u.Email == loginAttempt.Email);
            User existingUser = context.Users.FirstOrDefault(u => u.Username == loginAttempt.Username);

            if (existingEmail is null && loginAttempt.Email != string.Empty || existingUser is null && loginAttempt.Username != string.Empty)
            {
                return BadRequest("Invalid credentials");
            }
            else if (existingEmail is null && existingUser is null)
            {
                return BadRequest("Username/Email is blank");
            }

            if (existingEmail != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(loginAttempt.Password, existingEmail.Password))
                {
                    return BadRequest("Invalid credentials");
                }
                string jwtToken = jwtService.Generate(existingEmail.UserId);

                Response.Cookies.Append("jwt", jwtToken, new Microsoft.AspNetCore.Http.CookieOptions
                {
                    HttpOnly = true
                });

                return Ok(existingEmail);
            }

            if (existingUser != null)
            {
                if (!BCrypt.Net.BCrypt.Verify(loginAttempt.Password, existingUser.Password))
                {
                    return BadRequest("Invalid credentials");
                }

                string jwtToken = jwtService.Generate(existingUser.UserId);

                Response.Cookies.Append("jwt", jwtToken, new Microsoft.AspNetCore.Http.CookieOptions
                {
                    HttpOnly = true
                });

                return Ok(existingUser);
            }

            return Ok("You are successfully logged in");
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok("User has been logged out");
        }

        [HttpGet("validate")]
        public IActionResult ValidateUser()
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                var authenticatedUser = jwtService.Verify(jwt);

                return Ok(authenticatedUser);
            }
            catch
            {
                return Unauthorized();
            }
        }

        [HttpPatch("update-user")]
        public IActionResult UpdateUser([FromBody] User updatedUser)
        {
            try
            {
                string jwt = Request.Cookies["jwt"];
                var authenticatedUser = jwtService.Verify(jwt);
                User userToUpdate = context.Users.FirstOrDefault(u => u.UserId == updatedUser.UserId);
                User existingUser = context.Users.FirstOrDefault(u => u.Username == updatedUser.Username);
                User existingEmail = context.Users.FirstOrDefault(u => u.Email == updatedUser.Email);

                if (existingUser != null && authenticatedUser.Username != updatedUser.Username)
                {
                    return BadRequest("Username is already taken");
                }

                if (existingEmail != null && authenticatedUser.Email != updatedUser.Email)
                {
                    return BadRequest("Email is already taken");
                }

                if (userToUpdate is null)
                {
                    return NotFound();
                }

                userToUpdate.UserId = updatedUser.UserId;
                userToUpdate.Username = updatedUser.Username;
                userToUpdate.FirstName = updatedUser.FirstName;
                userToUpdate.LastName = updatedUser.LastName;
                userToUpdate.Email = updatedUser.Email;
                userToUpdate.CompanyName = updatedUser.CompanyName;
                context.SaveChanges();
                return Ok(userToUpdate);
            }
            catch
            {
                return BadRequest("Could not update the user");
            }
        }

    }
}
