using Eurogessr.Models.Song;
using Eurogessr.Models.VideoManager;

namespace Eurogessr.Models.Index
{
    public class IndexModel
    {
        public YoutubeVideoModel YoutubeVideo { get; set; } = new();
        public List<SongModel> SongsList { get; set; } = new();
        public string? CorrectGuess { get; set; }
    }
}
