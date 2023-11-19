using Euroguessr.Data.Tables;

namespace Euroguessr.Data
{
    public interface ISongManagerService
    {
        public Song? GetSong(string id);

        public Song? GetRandomSong();

        public List<Song> GetSongsModel();

        public Song GetTodayGuess();
    }
}
