using System.ComponentModel.DataAnnotations;

namespace Euroguessr.Data
{
    public class TodayGuessNumberRange
    {

        [Key]
        public int min_value { get; set; }

        [Key]
        public int max_value { get; set; }
    }
}