using Euroguessr.Data.Tables;
using Euroguessr.Data.Views;
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

        //DEFAULT VALUES INITIALIZED IN DATABASE (TodayGuessNumberRange and Song table)
        public void InitializeDefaultData()
        {

            // Default values for TodayGuessNumberRange table

            if (daily_guess_range.Any())
                daily_guess_range.Remove(daily_guess_range.First());

            DailyGuessRangeDto defaultRange = new() { 
                min_song_id = 324,
                max_song_id = 603
            };
            daily_guess_range.Add(defaultRange);
            SaveChanges();

            // Default values for Song table

            SongDto[] songs = Worker_Song.GetSongs().ToArray();

            song.RemoveRange(song.ToList());
            song.AddRange(songs);

            SaveChanges();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to postgres with connection string from app settings
            options.UseNpgsql(Configuration.GetConnectionString("DatabaseConnection"));
        }

        public DbSet<AccountDto> account { get; set; }
        public DbSet<TrainingScoreDto> training_score { get; set; }
        public DbSet<DailyScoreDto> daily_score { get; set; }
        public DbSet<DailyGuessDto> daily_guess { get; set; }
        public DbSet<DailyGuessRangeDto> daily_guess_range { get; set; }
        public DbSet<SongDto> song { get; set; }

        //Views
        public DbSet<UsersLeaderboardDaily> users_leaderboard_daily { get; set; }
        public DbSet<UsersLeaderboardTraining> users_leaderboard_training { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //FOREIGN KEYS
            modelBuilder.Entity<DailyGuessDto>()
                .HasOne(d => d.song)
                .WithMany(s => s.daily_guesses)
                .HasForeignKey(d => d.song_id);

            modelBuilder.Entity<DailyScoreDto>()
                .HasOne(d => d.account)
                .WithMany(a => a.daily_scores)
                .HasForeignKey(d => d.account_id);

            modelBuilder.Entity<TrainingScoreDto>()
                .HasOne(t => t.song)
                .WithMany(s => s.training_scores)
                .HasForeignKey(t => t.song_id);

            modelBuilder.Entity<TrainingScoreDto>()
                .HasOne(t => t.account)
                .WithMany(a => a.training_scores)
                .HasForeignKey(t => t.account_id);

            //PRIMARY KEYS
            modelBuilder.Entity<DailyScoreDto>()
                .HasKey(d => new { d.account_id, d.date });

            modelBuilder.Entity<TrainingScoreDto>()
                .HasKey(t => new { t.account_id, t.date });

            modelBuilder.Entity<DailyGuessRangeDto>()
                .HasKey(e => new { e.min_song_id, e.max_song_id });

            //AUTO-INCREMENT
            modelBuilder.Entity<SongDto>()
                .Property(s => s.id)
                .ValueGeneratedOnAdd();

            //VIEWS
            modelBuilder.Entity<UsersLeaderboardDaily>(ld =>
                ld.HasNoKey().ToView("users_leaderboard_daily")
            );

            modelBuilder.Entity<UsersLeaderboardTraining>(ld =>
                ld.HasNoKey().ToView("users_leaderboard_training")
            );
        }
    }
}
