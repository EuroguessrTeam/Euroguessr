namespace Euroguessr.Data
{
    public interface IJsonManagerService
    {
        public SongModel GetSong(string id);

        public List<SongModel> GetSongsModel();

        public SongModel GetTodayGuess();

    }
}
