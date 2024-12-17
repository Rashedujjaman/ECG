using Microsoft.AspNetCore.Mvc;
using ECG.Server.Data;
using ECG.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

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

        [Authorize]
        [AdminOnly]
        [HttpPost("AddMilestone")]
        public async Task<IActionResult> AddMilestone([FromForm] string title, [FromForm] IFormFileCollection files)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                return BadRequest(new { error = "Title cannot be empty." });
            }

            if (files == null || files.Count == 0)
            {
                return BadRequest(new { error = "At least one file is required." });
            }

            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                var milestone = await _dbContext.Milestone.FirstOrDefaultAsync(x => x.Title == title);
                if (milestone == null)
                {
                    milestone = new Milestone { Title = title };
                    await _dbContext.Milestone.AddAsync(milestone);
                    await _dbContext.SaveChangesAsync();
                }

                await UploadFiles(milestone.Id, files);

                await transaction.CommitAsync();
                return Ok(new { message = "Milestone and files added successfully!" });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                // Log exception here (e.g., using Serilog or NLog)
                return BadRequest(new { error = ex.Message });
            }
        }

        private async Task UploadFiles(int milestoneId, IFormFileCollection files)
        {
            foreach (var file in files)
            {
                using (var ms = new MemoryStream())
                {
                    await file.CopyToAsync(ms);
                    var fileData = ms.ToArray();

                    var milestoneFile = new MilestoneFile
                    {
                        MilestoneId = milestoneId,
                        FileName = file.FileName,
                        FileData = fileData
                    };

                    await _dbContext.MilestoneFiles.AddAsync(milestoneFile);
                }
            }

            await _dbContext.SaveChangesAsync();
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



        [Authorize]
        [AdminOnly]
        [HttpGet("DeleteFileById/{fileId}")]
        public async Task<IActionResult> DeleteFile(int fileId)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                var file = await _dbContext.MilestoneFiles.FindAsync(fileId);
                if (file == null)
                {
                    return NotFound(new { error = "File not found." });
                }

                _dbContext.MilestoneFiles.Remove(file);
                await _dbContext.SaveChangesAsync();

                await transaction.CommitAsync();
                return Ok(new { message = "File deleted successfully." });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new { error = "An error occurred while deleting the file.", details = ex.Message });
            }
        }

        [Authorize]
        [AdminOnly]
        [HttpGet("DeleteMilestone/{milestoneId}")]
        public async Task<IActionResult> DeleteMilestone(int milestoneId)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                var milestone = await _dbContext.Milestone
                    .Include(m => m.MilestoneFiles)
                    .FirstOrDefaultAsync(m => m.Id == milestoneId);

                if (milestone == null)
                {
                    return NotFound(new { error = "Milestone not found." });
                }

                _dbContext.MilestoneFiles.RemoveRange(milestone.MilestoneFiles);
                _dbContext.Milestone.Remove(milestone);
                await _dbContext.SaveChangesAsync();

                await transaction.CommitAsync();
                return Ok(new { message = "Milestone and associated files deleted successfully." });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new { error = "An error occurred while deleting the milestone.", details = ex.Message });
            }
        }


    }
}
