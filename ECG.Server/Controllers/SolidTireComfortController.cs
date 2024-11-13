using ECG.Server.Data;
using ECG.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace ECG.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolidTireComfortController : ControllerBase
    {
        private readonly ILogger<SolidTireComfortController> _logger;
        private readonly ApplicationDbContext _dbContext;

        public SolidTireComfortController(ILogger<SolidTireComfortController> logger, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

          [HttpGet("GetSolidTireComfort")]
        public ActionResult<IEnumerable<SolidTireComfort>> GetSolidTireComfort()
        {
            try
            {
                var results = _dbContext.SolidTireComfort.ToList();
                return Ok(results);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred while fetching data.");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
