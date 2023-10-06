using System.ComponentModel.DataAnnotations;

namespace Euroguessr.Data.Tables
{
    public class TodayGuessNumberRange
    {

        [Key]
        public int min_value { get; set; }

        [Key]
        public int max_value { get; set; }
    }
}