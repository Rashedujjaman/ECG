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
                var results = _dbContext.SolidTyreSmart.Where(r => r.isDeleted == false || r.isDeleted == null).ToList();
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


        [Authorize]
        [AdminOnly]
        [HttpPost("UpdateSolidTyreSmart/{id}")]
        public ActionResult UpdateSolidTyreSmart(int id, [FromBody] SolidTyreSmart updatedProduct)
        {
            try
            {
                var existingSolidTyreSmart = _dbContext.SolidTyreSmart.Find(id);
                if (existingSolidTyreSmart == null)
                {
                    return NotFound("Product not found");
                }

                existingSolidTyreSmart.Size = updatedProduct.Size;
                existingSolidTyreSmart.Rimsize = updatedProduct.Rimsize;
                existingSolidTyreSmart.Weight = updatedProduct.Weight;
                existingSolidTyreSmart.MM = updatedProduct.MM;
                existingSolidTyreSmart.Width = updatedProduct.Width;
                existingSolidTyreSmart.LoadBearing = updatedProduct.LoadBearing;
                existingSolidTyreSmart.Steering = updatedProduct.Steering;
                existingSolidTyreSmart.Category = updatedProduct.Category;

                _dbContext.SaveChanges();
                return Ok(existingSolidTyreSmart);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Authorize]
        [AdminOnly]
        [HttpGet("DeleteSolidTyreSmart/{id}")]
        public ActionResult DeleteSolidTyreSmart(int id)
        {
            try
            {
                var existingSolidTyreSmart = _dbContext.SolidTyreSmart.Find(id);
                if (existingSolidTyreSmart == null)
                {
                    return NotFound("Product not found");
                }

                existingSolidTyreSmart.isDeleted = true;

                _dbContext.SolidTyreSmart.Update(existingSolidTyreSmart);
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
