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
        public DbSet<SolidTyreRib> SolidTyreRib { get; set; }
        public DbSet<Enquiry> Enquiry { get; set; }
        public DbSet<Milestone> Milestone { get; set; }
        public DbSet<MilestoneFile> MilestoneFiles { get; set; }
        public DbSet<Compound> Compound { get; set; }
        public DbSet<Admin> Admin { get; set; }
    }
}
