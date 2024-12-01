using ECG.Server.Data;
using ECG.Server.Models;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("GetCompounds/{product}")]
        public ActionResult<IEnumerable<Compound>> GetCompounds(string product)
        {
            try
            {
                var result = _dbContext.Compound.Where(c => c.Product == product).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Authorize]
        [AdminOnly]
        [HttpPost("AddCompound")]
        public ActionResult<IEnumerable<Compound>> AddCompound([FromBody] Compound model)
        {
            try
            {
                _dbContext.Compound.Add(model);
                _dbContext.SaveChanges();
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [AdminOnly]
        [HttpPut("UpdateCompound/{id}")]
        public ActionResult<IEnumerable<Compound>> UpdateCompound(int id, [FromBody] Compound model)
        {
            try
            {
                var compound = _dbContext.Compound.FirstOrDefault(c => c.Id == id);

                if (compound == null)
                {
                    return BadRequest("Compound Not Found");
                }
                compound.Name = model.Name;
                compound.Alias = model.Alias;

                _dbContext.Compound.Update(compound);
                _dbContext.SaveChanges();

                return Ok(compound);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [AdminOnly]
        [HttpDelete("DeleteCompound/{id}")]
        public ActionResult DeleteCompound(int id)
        {
            try
            {
                var compound = _dbContext.Compound.Find(id);

                if (compound == null)
                {
                    return NotFound("Compound Not Found");
                }

                _dbContext.Compound.Remove(compound);
                _dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
