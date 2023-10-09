using Euroguessr.Models.Song;

namespace Euroguessr.Data.Interfaces
{
    public interface IJsonManagerService
    {
        public SongModel GetSong(string id);

        public List<SongModel> GetSongsModel();

        public SongModel GetTodayGuess();

    }
}
