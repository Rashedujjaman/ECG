using Microsoft.AspNetCore.Mvc;
using ECG.Server.Data;
using ECG.Server.Models;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MailKit.Net.Smtp;


namespace ECG.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnquiryController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public EnquiryController(ApplicationDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpPost("AddEnquiry")]
        public async Task<ActionResult> AddNewEnquiry([FromBody] Enquiry model)
        {
            try
            {
                model.DateTime = DateTimeOffset.Now;

                await _dbContext.Enquiry.AddAsync(model);
                var result = await _dbContext.SaveChangesAsync();
                if (result == 0)
                {
                    return BadRequest("Failed to save enquiry.");
                }
                //await SendEmailAsync(model.Email, "New Enquiry", model.Name, model.Message);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private async Task SendEmailAsync(string fromEmail, string subject, string name, string body)
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress("Comfotr Green Tyre", _configuration["Email:From"]));

                email.To.Add(new MailboxAddress("Admin", _configuration["Email:To"]));
                email.Subject = subject;
                email.Body = new TextPart("plain") { Text = body };

                using var smtp = new SmtpClient();
                smtp.Connect(_configuration["Email:Host"], 465, true);
                //smtp.Connect(_configuration["Email:Host"], int.Parse(_configuration["Email:Port"]), true);
                //await smtp.StartTlsAsync();
                var Username = _configuration["Email: Username"];
                var Password = _configuration["Email: Password"];
                smtp.Authenticate("robiulboksi17@gmail.com", "Rubel@1234");

                await smtp.SendAsync(email);
                smtp.Disconnect(true);
                smtp.Dispose();

                //return Ok("Email sent successfully.");
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("GetAllEnquiries")]
        public async Task<ActionResult> GetAllEnquiries()
        {
            try
            {
                var enquiries = await _dbContext.Enquiry.ToListAsync();
                return Ok(enquiries);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
