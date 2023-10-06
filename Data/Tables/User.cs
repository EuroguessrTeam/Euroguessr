using System.ComponentModel.DataAnnotations;

namespace Euroguessr.Data.Tables
{
    public class User
    {

        [Key]
        [MaxLength(36)]
        public String unique_token { get; set; }

        public List<Score> scores { get; set; }
    }
}