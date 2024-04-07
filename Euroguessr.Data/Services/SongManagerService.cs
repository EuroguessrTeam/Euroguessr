using Euroguessr.Data.Tables;

namespace Euroguessr.Data
{
    public class SongManagerService : ISongManagerService
    {

        private readonly EntityContext _context;

        public SongManagerService(EntityContext context)
        {
            _context = context;
        }

        public Song? GetSong(string id)
        {
            return _context.Song.Where(s => s.id == Int32.Parse(id)).FirstOrDefault();
        }

        public Song? GetRandomSong()
        {
            var potential_songs = _context.Song.Where(s => !string.IsNullOrWhiteSpace(s.video_id)).ToArray();

            return potential_songs.Any() ? potential_songs.ElementAt(new Random().Next(0, potential_songs.Count())) :
                                           null;
        }

        public List<Song> GetSongsModel()
        {
            return _context.Song.OrderByDescending(s => s.id).ToList();
        }

        public List<Song> SearchSongs(string? searchTerm, int page, int rowsNumber)
        {
            if (searchTerm == null)
            {
                return _context.Song.OrderByDescending(s => s.year)
                                    .Skip((page-1)*rowsNumber)
                                    .Take(rowsNumber)
                                    .ToList();
            }
            else
            {
                return _context.Song.Where(s => s.song_name.ToLower().Contains(searchTerm.ToLower()) || s.artist_name.ToLower().Contains(searchTerm.ToLower()) || s.year.ToString().ToLower().Contains(searchTerm.ToLower()) || s.country.ToLower().Contains(searchTerm.ToLower()))
                                    .OrderByDescending(s => s.year)
                                    .Skip((page-1)*rowsNumber)
                                    .Take(rowsNumber)
                                    .ToList();
            }
        }

        public int CountSongs(string searchTerm)
        {
            return _context.Song.Where(s => s.song_name.ToLower().Contains(searchTerm.ToLower()) || s.artist_name.ToLower().Contains(searchTerm.ToLower()) || s.year.ToString().ToLower().Contains(searchTerm.ToLower()) || s.country.ToLower().Contains(searchTerm.ToLower())).Count();
        }

        public Song GetTodayGuess()
        {

            var todayDate = DateOnly.FromDateTime(DateTime.Now.ToUniversalTime());
            string? id = _context.TodayGuessNumber.Where(c => c.guess_date.CompareTo(todayDate) == 0).FirstOrDefault()?.today_guess_id.ToString();

            if (id == null)
            {
                int min = _context.TodayGuessNumberRange.Select(c => c.min_value).FirstOrDefault();
                int max = _context.TodayGuessNumberRange.Select(c => c.max_value).FirstOrDefault();
                id = new Random().Next(min, max).ToString();

                TodayGuessNumber newGuess = new()
                {
                    guess_date = todayDate,
                    today_guess_id = int.Parse(id)
                };

                //Try to add the new song to guess in Database
                try
                {
                    _context.TodayGuessNumber.Add(newGuess);
                    _context.SaveChanges();
                }
                //If the song failed to save, it has already been write (the date is the primary key in the table).
                catch (Exception)
                {
                    id = _context.TodayGuessNumber.Where(c => c.guess_date.CompareTo(todayDate) == 0).FirstOrDefault()?.today_guess_id.ToString();
                }
            }

            return GetSong(id);
        }
    }
}
