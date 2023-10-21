using System.ComponentModel.DataAnnotations;

namespace Euroguessr.Data
{
    public class TodayGuessNumber
    {

        [Required]
        public int today_guess_id { get; set; }

        [Key]
        public DateOnly guess_date { get; set; }
    }
}