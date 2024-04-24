using Euroguessr.Data.Tables;
using Microsoft.EntityFrameworkCore;

namespace Euroguessr.Data
{
    public class SongService : ISongService
    {

        private readonly EntityContext _context;

        public SongService(EntityContext context)
        {
            _context = context;
        }

        public SongDto? GetSong(string id)
        {
            return _context.song.Where(s => s.id == Int32.Parse(id)).FirstOrDefault();
        }

        public SongDto? GetRandomSong()
        {
            var potential_songs = _context.song.Where(s => !string.IsNullOrWhiteSpace(s.video_id)).ToArray();

            return potential_songs.Any() ? potential_songs.ElementAt(new Random().Next(0, potential_songs.Count())) :
                                           null;
        }

        public List<SongDto> GetSongsModel()
        {
            return _context.song.OrderByDescending(s => s.id).ToList();
        }

        public List<SongDto> SearchSongs(string? searchTerm, int page, int rowsNumber)
        {
            if (searchTerm == null)
            {
                return _context.song.OrderByDescending(s => s.year)
                                    .Skip((page-1)*rowsNumber)
                                    .Take(rowsNumber)
                                    .ToList();
            }
            else
            {
                return _context.song.Where(s => s.song_name.ToLower().Contains(searchTerm.ToLower()) || s.artist_name.ToLower().Contains(searchTerm.ToLower()) || s.year.ToString().ToLower().Contains(searchTerm.ToLower()) || s.country.ToLower().Contains(searchTerm.ToLower()))
                                    .OrderByDescending(s => s.year)
                                    .Skip((page-1)*rowsNumber)
                                    .Take(rowsNumber)
                                    .ToList();
            }
        }

        public int CountSongs(string? searchTerm)
        {
            if (searchTerm == null)
            {
                return _context.song.Count();
            }
            return _context.song.Where(s => s.song_name.ToLower().Contains(searchTerm.ToLower()) || s.artist_name.ToLower().Contains(searchTerm.ToLower()) || s.year.ToString().ToLower().Contains(searchTerm.ToLower()) || s.country.ToLower().Contains(searchTerm.ToLower())).Count();
        } 

        public SongDto GetTodayGuess()
        {
            var todayDate = DateOnly.FromDateTime(DateTime.Now.ToUniversalTime());
            string? id = _context.daily_guess.Where(c => c.date.CompareTo(todayDate) == 0).FirstOrDefault()?.song_id.ToString();

            if (id == null)
            {
                int min = _context.daily_guess_range.Select(c => c.min_song_id).FirstOrDefault();
                int max = _context.daily_guess_range.Select(c => c.max_song_id).FirstOrDefault();
                id = new Random().Next(min, max).ToString();

                DailyGuessDto newGuess = new()
                {
                    date = todayDate,
                    song_id = int.Parse(id)
                };

                //Try to add the new song to guess in Database
                try
                {
                    _context.daily_guess.Add(newGuess);
                    _context.SaveChanges();
                }
                catch (Exception e)
                {
                    //If the song failed to save, it has already been write by another person (the date is the primary key in the table).
                    if (e is DbUpdateException || e is DbUpdateConcurrencyException)
                    {
                        id = _context.daily_guess.Where(c => c.date.CompareTo(todayDate) == 0).FirstOrDefault()?.song_id.ToString();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            return GetSong(id);
        }
    }
}
