using Euroguessr.Data.Tables;

namespace Euroguessr.Data
{
    public interface ISongService
    {
        public SongDto? GetSong(string id);

        public SongDto? GetRandomSong();

        public List<SongDto> GetSongsModel();

        public List<SongDto> SearchSongs(string? searchTerm, int page, int rowsNumber);

        public int CountSongs(string? searchTerm);

        public SongDto GetTodayGuess();
    }
}
