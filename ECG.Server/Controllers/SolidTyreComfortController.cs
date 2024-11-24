using ECG.Server.Data;
using ECG.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECG.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolidTyreComfortController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public SolidTyreComfortController(ApplicationDbContext dbContext)
        {
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
                return BadRequest(e.Message);
            }
        }


        [Authorize]
        [AdminOnly]
        [HttpPost("AddSolidTyreComfort")]
        public ActionResult AddSolidTyreComfort([FromBody] SolidTyreComfort newProduct)
        {
            if (newProduct == null)
            {
                return BadRequest("Invalid product data.");
            }

            try
            {
                _dbContext.SolidTyreComfort.Add(newProduct);
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
