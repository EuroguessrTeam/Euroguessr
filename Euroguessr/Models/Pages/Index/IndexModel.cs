using Euroguessr.Data;
using Euroguessr.Data.Tables;

namespace Euroguessr.Models.Pages.Index
{
    public class IndexModel
    {
        public Song TodaySong { get; set; } = new();
        public List<Song> SongsList { get; set; } = new();
        public Score CurrentUserScore { get; set; } = new();
        public int SecondsOfListening => CurrentUserScore.win ? 0 :
                                         CurrentUserScore.attempts == 0 ? 1 :
                                         CurrentUserScore.attempts == 1 ? 2 :
                                         CurrentUserScore.attempts == 2 ? 5 :
                                         CurrentUserScore.attempts == 3 ? 10 :
                                         CurrentUserScore.attempts == 4 ? 30 :
                                         CurrentUserScore.attempts == 5 ? 60 :
                                         CurrentUserScore.attempts == 6 ? 90 :
                                                                          180;
    }
}
