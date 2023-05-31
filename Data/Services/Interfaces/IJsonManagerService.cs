using Eurogessr.Models.Song;
using Eurogessr.Models.TodayGuess;
using Eurogessr.Models.VideoManager;

namespace Eurogessr.Data.Services.Interfaces
{
    public interface IJsonManagerService
    {
        public SongModel GetSong(string id);

        public List<SongModel> GetSongsModel();

        public TodayGuessModel GetTodayGuess();

    }
}
