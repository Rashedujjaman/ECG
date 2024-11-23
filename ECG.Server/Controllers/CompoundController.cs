using ECG.Server.Data;
using ECG.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace ECG.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompoundController: ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public CompoundController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("GetCompounds")]
        public ActionResult<IEnumerable<Compound>> getCompounds() 
        {
            try
            {
                var result = _dbContext.Compound.ToList();
                return Ok(result);
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
 
        }

    }
}
