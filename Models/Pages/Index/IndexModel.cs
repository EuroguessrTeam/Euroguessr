using Euroguessr.Models.Song;
using Euroguessr.Models.VideoManager;
using Euroguessr.Data.Tables;

namespace Euroguessr.Models.Pages.Index
{
    public class IndexModel
    {
        public YoutubeVideoModel YoutubeVideo { get; set; } = new();
        public List<SongModel> SongsList { get; set; } = new();
        public Score CurrentUserScore { get; set; }
        public int SecondsOfListening => CurrentUserScore.win ? 0 :
                                         CurrentUserScore.attempts == 0 ? 1 :
                                         CurrentUserScore.attempts == 1 ? 2 :
                                         CurrentUserScore.attempts == 2 ? 5 :
                                         CurrentUserScore.attempts == 3 ? 10 :
                                         CurrentUserScore.attempts == 4 ? 30 :
                                                                          90;
    }
}
