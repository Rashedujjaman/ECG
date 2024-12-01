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
                var results = _dbContext.SolidTyreComfort.Where(r => r.isDeleted == false || r.isDeleted == null).ToList();
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


        [Authorize]
        [AdminOnly]
        [HttpPut("UpdateSolidTyreComfort/{id}")]
        public ActionResult UpdateSolidTyreComfort(int id, [FromBody] SolidTyreComfort updatedProduct)
        {
            if (updatedProduct == null || id != updatedProduct.Id)
            {
                return BadRequest("Invalid product data.");
            }

            try
            {
                var existingSolidTyreComfort = _dbContext.SolidTyreComfort.Find(id);
                if (existingSolidTyreComfort == null)
                {
                    return NotFound("Product not found.");
                }

                existingSolidTyreComfort.Size = updatedProduct.Size;
                existingSolidTyreComfort.Rimsize = updatedProduct.Rimsize;
                existingSolidTyreComfort.Weight = updatedProduct.Weight;
                existingSolidTyreComfort.MM = updatedProduct.MM;
                existingSolidTyreComfort.Width = updatedProduct.Width;
                existingSolidTyreComfort.LoadBearing = updatedProduct.LoadBearing;
                existingSolidTyreComfort.Steering = updatedProduct.Steering;
                existingSolidTyreComfort.Category = updatedProduct.Category;

                _dbContext.SolidTyreComfort.Update(existingSolidTyreComfort);
                _dbContext.SaveChanges();

                return Ok(existingSolidTyreComfort);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Authorize]
        [AdminOnly]
        [HttpDelete("DeleteSolidTyreComfort/{id}")]
        public ActionResult DeleteSolidTyreComfort(int id)
        {
            try
            {
                var existingSolidTyreComfort = _dbContext.SolidTyreComfort.Find(id);
                if (existingSolidTyreComfort == null)
                {
                    return NotFound("Product not found.");
                }

                existingSolidTyreComfort.isDeleted = true;
                _dbContext.SolidTyreComfort.Update(existingSolidTyreComfort);
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
