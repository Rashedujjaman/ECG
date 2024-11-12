using ECG.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ECG.Server.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<SolidTireComfort> SolidTireComfort { get; set; }
    }
}
