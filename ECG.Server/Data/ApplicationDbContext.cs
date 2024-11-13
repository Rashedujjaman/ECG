using ECG.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace ECG.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<SolidTyreComfort> SolidTyreComfort { get; set; }
        public DbSet<SolidTyreSmart> SolidTyreSmart { get; set; }
    }
}
