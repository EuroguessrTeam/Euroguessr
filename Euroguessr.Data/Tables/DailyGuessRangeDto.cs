using System.ComponentModel.DataAnnotations;

namespace Euroguessr.Data
{
    public class DailyGuessRangeDto
    {

        [Key]
        public int min_song_id { get; set; }

        [Key]
        public int max_song_id { get; set; }
    }
}