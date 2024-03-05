using Euroguessr.Data.Tables;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using static System.Formats.Asn1.AsnWriter;

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

            if (TodayGuessNumberRange.Any())
                TodayGuessNumberRange.Remove(TodayGuessNumberRange.First());

            TodayGuessNumberRange defaultRange = new() { 
                min_value = 450, 
                max_value = 529 
            };
            TodayGuessNumberRange.Add(defaultRange);
            SaveChanges();

            // Default values for Song table

            Song[] songs = Worker_Song.GetSongs().ToArray();

            if (!Song.Any())
            {
                Song.AddRange(songs);
            }
            else
            {
                foreach (var s in songs)
                {
                    var songToUpdate = Song.Find(s.id);
                    if (songToUpdate != null)
                    {
                        songToUpdate.year = s.year;
                        songToUpdate.country = s.country;
                        songToUpdate.song_name = s.song_name;
                        songToUpdate.artist_name = s.artist_name;
                        songToUpdate.video_id = s.video_id;
                        songToUpdate.seek_to = s.seek_to;
                        Song.Update(songToUpdate);
                    }
                    else
                    {
                        Song.Add(s);
                    }
                }
            }
            SaveChanges();
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

            modelBuilder.Entity<Song>()
                .Property(s => s.id)
                .ValueGeneratedOnAdd();
        }
    }
}
