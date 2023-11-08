using Euroguessr.Data.Tables;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

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
            options.UseNpgsql(Configuration.GetConnectionString("DatabaseConnection"));
        }

        public DbSet<User> User { get; set; }
        public DbSet<Score> Score { get; set; }
        public DbSet<TodayGuessNumber> TodayGuessNumber { get; set; }
        public DbSet<TodayGuessNumberRange> TodayGuessNumberRange { get; set; }
        public DbSet<Song> Song { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //TABLES WITH 2+ PRIMARY KEYS

            modelBuilder.Entity<Score>()
                .HasKey(e => new { e.Userunique_token, e.date });

            modelBuilder.Entity<TodayGuessNumberRange>()
                .HasKey(e => new { e.min_value, e.max_value });

            //AUTO INCREMENT ID

            modelBuilder.Entity<Song>()
                .Property(s => s.id)
                .ValueGeneratedOnAdd();

            //DEFAULT VALUES FOR TESTING

            modelBuilder.Entity<User>()
                .HasData(
                new User { unique_token = "a2a72798-690c-4301-9a01-1cf88e2080cc" }
            );

            modelBuilder.Entity<TodayGuessNumberRange>()
                .HasData(
                new TodayGuessNumberRange { min_value = 503, max_value = 528 }
            );

            modelBuilder.Entity<Score>()
                .HasData(
                new Score { Userunique_token = "a2a72798-690c-4301-9a01-1cf88e2080cc", date = DateOnly.FromDateTime(DateTime.Now.ToUniversalTime()), attempts = 3, win = true }
            );

            #region Default Song Dataset

            //DEFAULT SONG DATASET
            Song[] songs = Worker_Song.GetSongs().ToArray();

            modelBuilder.Entity<Song>()
                .HasData(songs);
            #endregion
        }
    }
}
