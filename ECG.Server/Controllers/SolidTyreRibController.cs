using ECG.Server.Data;
using ECG.Server.Models;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [AdminOnly]
        [HttpPost("AddSolidTyreRib")]
        public ActionResult<SolidTyreRib> AddSolidTyreRib([FromBody] SolidTyreRib solidTyreRib)
        {
            if (solidTyreRib == null)
            {
                return BadRequest("SolidTyreRib is null.");
            }

            try
            {
                _dbContext.SolidTyreRib.Add(solidTyreRib);
                _dbContext.SaveChanges();
                return Ok(solidTyreRib);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Authorize]
        [AdminOnly]
        [HttpPut("UpdateSolidTyreRib/{id}")]
        public ActionResult<SolidTyreRib> UpdateSolidTyreRib(int id, [FromBody] SolidTyreRib updatedSolidTyreRib)
        {
            if (updatedSolidTyreRib == null)
            {
                return BadRequest("Updated SolidTyreRib is null.");
            }

            try
            {
                var existingSolidTyreRib = _dbContext.SolidTyreRib.Find(id);
                if (existingSolidTyreRib == null)
                {
                    return NotFound("SolidTyreRib not found.");
                }

                existingSolidTyreRib.Size = updatedSolidTyreRib.Size;
                existingSolidTyreRib.Rimsize = updatedSolidTyreRib.Rimsize;
                existingSolidTyreRib.Weight = updatedSolidTyreRib.Weight;
                existingSolidTyreRib.MM = updatedSolidTyreRib.MM;
                existingSolidTyreRib.Width = updatedSolidTyreRib.Width;
                existingSolidTyreRib.LoadBearing = updatedSolidTyreRib.LoadBearing;
                existingSolidTyreRib.Steering = updatedSolidTyreRib.Steering;
                existingSolidTyreRib.Category = updatedSolidTyreRib.Category;

                _dbContext.SaveChanges();
                return Ok(existingSolidTyreRib);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize]
        [AdminOnly]
        [HttpDelete("DeleteSolidTyreRib/{id}")]
        public ActionResult DeleteSolidTyreRib(int id)
        {
            try
            {
                var solidTyreRib = _dbContext.SolidTyreRib.Find(id);
                if (solidTyreRib == null)
                {
                    return NotFound("SolidTyreRib not found.");
                }

                _dbContext.SolidTyreRib.Remove(solidTyreRib);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}
