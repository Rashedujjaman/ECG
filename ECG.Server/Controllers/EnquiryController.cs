﻿using ECG.Server.Data;
using ECG.Server.Models;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using System.Text;


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
        public async Task<ActionResult> AddNewEnquiry([FromBody] Enquiry enquiry)
        {
            try
            {
                enquiry.DateTime = DateTimeOffset.Now;

                await _dbContext.Enquiry.AddAsync(enquiry);
                var result = await _dbContext.SaveChangesAsync();
                if (result == 0)
                {
                    return BadRequest("Failed to save enquiry.");
                }
                await SendEmailAsync(enquiry);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //private async Task SendEmailAsync(string fromEmail, string subject, string name, string body)
        private async Task SendEmailAsync(Enquiry enquiry)
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(new MailboxAddress("Comfotr Green Tyre", _configuration["Email:From"]));

                email.To.Add(new MailboxAddress("Admin", _configuration["Email:To"]));
                email.Subject = "New Enquiry";

                // An HTML table for the email body
                string htmlBody = $@"
                <html>
                <body>
                    <h1>Dear Admin,</h1>
                    <h2>You have received new enquiry from customer.</h2>
                    <table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse; width: 100%;'>
                        <tr style='background-color: #f2f2f2;'>
                            <th style='text-align: left;'>Particular</th>
                            <th style='text-align: left;'>Details</th>
                        </tr>
                        <tr>
                            <td><strong>Name</strong></td>
                            <td>{enquiry.Name}</td>
                        </tr>
                        <tr>
                            <td><strong>Email</strong></td>
                            <td>{enquiry.Email}</td>
                        </tr>
                        <tr>
                            <td><strong>Phone</strong></td>
                            <td>{enquiry.MobileNo}</td>
                        </tr>
                        <tr>
                            <td><strong>Date</strong></td>
                            <td>{enquiry.DateTime}</td>
                        </tr>
                        <tr>
                            <td><strong>Address</strong></td>
                            <td>{enquiry.Address}</td>
                        </tr>
                        <tr>
                            <td><strong>Message</strong></td>
                            <td>{enquiry.Message}</td>
                        </tr>
                    </table>
                    <h5>Please respond to the customer as soon as possible.</h5>
                </body>
                </html>
                ";

                email.Body = new TextPart("html") { Text = htmlBody };

                using var smtp = new SmtpClient();
                smtp.Connect(_configuration["Email:Host"], int.Parse(_configuration["Email:Port"]), true);

                var Username = _configuration["Email:Username"];
                var Password = _configuration["Email:Password"];
                smtp.Authenticate(Username, Password);

                await smtp.SendAsync(email);
                smtp.Disconnect(true);
                smtp.Dispose();
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





    //public class CharacterCounter
    //{
    //    public static Dictionary<char, int> CountDistinctCharacters(string word)
    //    {
    //        Dictionary<char, int> charCounts = new Dictionary<char, int>();

    //        foreach (char c in word)
    //        {
    //            if (charCounts.ContainsKey(c))
    //            {
    //                charCounts[c]++;
    //            }

    //            else
    //            {
    //                charCounts.Add(c, 1);
    //            }
    //        }

    //        return charCounts;
    //    }

    //    public static void Main(string[] args)
    //    {
    //        string word = "banana";
    //        Dictionary<char, int> counts = CountDistinctCharacters(word);

    //        Console.WriteLine($"Character counts for \"{word}\":");
    //        foreach (var entry in counts)
    //        {
    //            Console.WriteLine($"'{entry.Key}': {entry.Value}");
    //        }

    //        word = "hello world";
    //        counts = CountDistinctCharacters(word);
    //        Console.WriteLine($"\nCharacter counts for \"{word}\":");
    //        foreach (var entry in counts)
    //        {
    //            Console.WriteLine($"'{entry.Key}': {entry.Value}");
    //        }
    //    }
    //}
}
