using Euroguessr.Data.Interfaces;
using Euroguessr.Models.Song;
using Euroguessr.Models.TodayGuess;
using System.Text.Json;
using Euroguessr.Data.Tables;

namespace Euroguessr.Data.Services
{
    public class JsonManagerService : IJsonManagerService
    {

        private static readonly string jsonSongsDataPath = "./Data/SongsData.json";
        private readonly EntityContext _context;

        public JsonManagerService(EntityContext context)
        {
            _context = context;
        }

        public SongModel GetSong(string id)
        {
            // Lecture du contenu du fichier JSON
            string fileContent = System.IO.File.ReadAllText(jsonSongsDataPath);

            // Désérialisation du JSON en une liste d'objets SongModel
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            List<SongModel> songs = JsonSerializer.Deserialize<List<SongModel>>(fileContent, options);

            // Recherche de la chanson avec l'ID spécifié
            SongModel song = songs.FirstOrDefault(s => s.Id == id);

            return song;
        }

        public List<SongModel> GetSongsModel()
        {

            // Lecture du contenu du fichier JSON
            string fileContent = System.IO.File.ReadAllText(jsonSongsDataPath);

            // Désérialisation du JSON en une liste d'objets SongModel
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            return JsonSerializer.Deserialize<List<SongModel>>(fileContent, options);
        }

        public SongModel GetTodayGuess()
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

            /*
            string fileContent = System.IO.File.ReadAllText(jsonTodayGuessPath);

            // Désérialisation du JSON en une liste d'objets TodayGuess
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            return JsonSerializer.Deserialize<TodayGuessModel>(fileContent, options);
            */
        }
    }
}
