using Eurogessr.Models.Song;
using Eurogessr.Models.VideoManager;
using Euroguessr.Models.Index;

namespace Eurogessr.Models.Index
{
    public class IndexModel
    {
        public YoutubeVideoModel YoutubeVideo { get; set; } = new();
        public List<SongModel> SongsList { get; set; } = new();
        public UserData userData { get; set; }
    }
}
