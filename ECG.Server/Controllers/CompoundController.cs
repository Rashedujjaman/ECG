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
        public ActionResult<IEnumerable<Compound>> GetCompounds() 
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


        [HttpDelete("DeleteCompound/{id}")]
        public ActionResult DeleteCompound(int id)
        {
            try
            {
                var compound = _dbContext.Compound.FirstOrDefault(c => c.Id == id);

                if (compound == null)
                {
                    return NotFound("Compound Not Found");
                }

                _dbContext.Compound.Remove(compound);
                _dbContext.SaveChanges();

                return Ok("Compound Deleted Successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



    }
}
