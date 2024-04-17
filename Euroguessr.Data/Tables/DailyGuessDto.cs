using Euroguessr.Data.Tables;
using System.ComponentModel.DataAnnotations;

namespace Euroguessr.Data
{
    public class DailyGuessDto
    {
        [Key]
        public DateOnly date { get; set; }

        [Required]
        public int song_id { get; set; }
        public SongDto song { get; set; }

    }
}