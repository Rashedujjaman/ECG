using ECG.Server.Data;
using ECG.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace ECG.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolidTyreRibController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public SolidTyreRibController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetSolidTyreRib")]
        public ActionResult<IEnumerable<SolidTyreRib>> GetSolidTyreRib()
        {
            try
            {
                var results = _dbContext.SolidTyreRib.ToList();
                return Ok(results);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
