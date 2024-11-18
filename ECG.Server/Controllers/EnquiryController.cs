using Microsoft.AspNetCore.Mvc;
using ECG.Server.Data;
using ECG.Server.Models;
using Microsoft.EntityFrameworkCore;


namespace ECG.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnquiryController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public EnquiryController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
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
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
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
