using Euroguessr.Data.Tables;
using System.Text.Json;

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

        public List<Song> GetSongsModel()
        {
            return _context.Song.OrderByDescending(s => s.id).ToList();
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
