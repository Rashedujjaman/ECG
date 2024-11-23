using Microsoft.AspNetCore.Mvc;
using ECG.Server.Data;
using ECG.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ECG.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MilestoneController: ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public MilestoneController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("AddMilestone")]
        public async Task<IActionResult> AddMilestone([FromForm] string title, [FromForm] IFormFileCollection files)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                // Create a new milestone
                var milestone = new Milestone { Title = title };
                await _dbContext.Milestone.AddAsync(milestone);
                await _dbContext.SaveChangesAsync();

                // Save each file to the database
                foreach (var file in files)
                {
                    using (var ms = new MemoryStream())
                    {
                        await file.CopyToAsync(ms);
                        var fileData = ms.ToArray();

                        var milestoneFile = new MilestoneFile
                        {
                            MilestoneId = milestone.Id,
                            FileName = file.FileName,
                            FileData = fileData
                        };

                        await _dbContext.MilestoneFiles.AddAsync(milestoneFile);
                    }
                }

                await _dbContext.SaveChangesAsync();
                await transaction.CommitAsync();
                return Ok(new { message = "Milestone and files added successfully!" });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("GetMilestones")]
        public async Task<IActionResult> GetMilestones()
        {
            var milestones = await _dbContext.Milestone
                .Include(m => m.MilestoneFiles)
                .ToListAsync();

            var result = milestones.Select(m => new
            {
                m.Id,
                m.Title,
                Files = m.MilestoneFiles.Select(f => new
                {
                    f.Id,
                    f.FileName
                })
            });

            return Ok(result);
        }

        [HttpGet("DownloadFile/{fileId}")]
        public async Task<IActionResult> DownloadFile(int fileId)
        {
            var file = await _dbContext.MilestoneFiles.FindAsync(fileId);
            if (file == null)
            {
                return NotFound("File not found.");
            }

            return File(file.FileData, "application/pdf", file.FileName);
        }
    }
}
