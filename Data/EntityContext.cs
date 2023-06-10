using Euroguessr.Data.Migrations;
using Microsoft.EntityFrameworkCore;

namespace Euroguessr.Data
{
    public class EntityContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public EntityContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to postgres with connection string from app settings
            options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
        }

        public DbSet<TestUser> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TestUser>()
                .HasKey(e => new { e.ID, e.Name });
        }
    }
}
