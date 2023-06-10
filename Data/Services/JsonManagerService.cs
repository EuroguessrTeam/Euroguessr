using Euroguessr.Data.Interfaces;
using Eurogessr.Models.Song;
using Eurogessr.Models.TodayGuess;
using System.Text.Json;

namespace Euroguessr.Data.Services
{
    public class JsonManagerService : IJsonManagerService
    {

        private static readonly string jsonSongsDataPath = "./Data/SongsData.json";
        private static readonly string jsonTodayGuessPath = "./Data/TodayGuess.json";
        public JsonManagerService() {
            
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

        public TodayGuessModel GetTodayGuess()
        {
            string fileContent = System.IO.File.ReadAllText(jsonTodayGuessPath);

            // Désérialisation du JSON en une liste d'objets TodayGuess
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            return JsonSerializer.Deserialize<TodayGuessModel>(fileContent, options);
        }
    }
}
