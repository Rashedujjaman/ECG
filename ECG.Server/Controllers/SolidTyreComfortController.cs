using ECG.Server.Data;
using ECG.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace ECG.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolidTyreComfortController : ControllerBase
    {
        private readonly ILogger<SolidTyreComfortController> _logger;
        private readonly ApplicationDbContext _dbContext;
        public SolidTyreComfortController(ILogger<SolidTyreComfortController> logger, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

          [HttpGet("GetSolidTyreComfort")]
        public ActionResult<IEnumerable<SolidTyreComfort>> GetSolidTyreComfort()
        {
            try
            {
                var results = _dbContext.SolidTyreComfort.ToList();
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
