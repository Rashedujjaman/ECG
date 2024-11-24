using ECG.Server.Data;
using ECG.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECG.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolidTyreSmartController: ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public SolidTyreSmartController(ApplicationDbContext dbContext)
        {
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
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [AdminOnly]
        [HttpPost("AddSolidTyreSmart")]
        public ActionResult AddSolidTyreSmart([FromBody] SolidTyreSmart newProduct)
        {
            try
            {
                _dbContext.SolidTyreSmart.Add(newProduct);
                _dbContext.SaveChanges();
                return Ok(newProduct);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}
