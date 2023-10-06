using Eurogessr.Models.Song;
using Eurogessr.Models.TodayGuess;
using Eurogessr.Models.VideoManager;

namespace Euroguessr.Data.Interfaces
{
    public interface IJsonManagerService
    {
        public SongModel GetSong(string id);

        public List<SongModel> GetSongsModel();

        public SongModel GetTodayGuess();

    }
}
