using Euroguessr.Data.Tables;

namespace Euroguessr.Data
{
    public interface ISongManagerService
    {
        public Song? GetSong(string id);

        public Song? GetRandomSong();

        public List<Song> GetSongsModel();

        public List<Song> SearchSongs(string searchTerm, int page, int rowsNumber);

        public int CountSongs(string searchTerm);

        public Song GetTodayGuess();
    }
}
