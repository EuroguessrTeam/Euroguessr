using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Euroguessr.Data
{
    public class Score
    {

        [Key]
        [ForeignKey("FK_User")]
        [MaxLength(36)]
        public string Userunique_token { get; set; }

        [Key]
        public DateOnly date { get; set; }

        public int attempts { get; set; }
        public bool win { get; set; }

        public string DisplayName => string.Format(
                                                       "{0} : {1} {2} {3}",
                                                       date,
                                                       win == true ? "Guessed in" : "Not guessed. You tried",
                                                       attempts,
                                                       win == true ? "attempts !" : "time(s)."
                                                   );
    }
}
