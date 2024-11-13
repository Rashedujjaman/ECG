using ECG.Server.Data;
using ECG.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace ECG.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolidTyreSmartController: ControllerBase
    {
        private readonly ILogger<SolidTyreComfortController> _logger;
        private readonly ApplicationDbContext _dbContext;

        public SolidTyreSmartController(ILogger<SolidTyreComfortController> logger, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpGet("GetSolidTyreSmart")]
        public ActionResult<IEnumerable<SolidTyreComfort>> GetSolidTyreComfort()
        {
            try
            {
                var results = _dbContext.SolidTyreSmart.ToList();
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
