using Euroguessr.Data.Tables;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Euroguessr.Data
{
    public class TrainingScoreDto
    {

        [Key]
        [MaxLength(36)]
        [JsonIgnore]
        public string account_id { get; set; }

        [JsonIgnore]
        public AccountDto account { get; set; }

        /// <summary>
        /// The date of the score
        /// </summary>
        [Key]
        public DateTime date { get; set; }

        [JsonIgnore]
        public int song_id { get; set; }

        [JsonIgnore]
        public SongDto song { get; set; }

        /// <summary>
        /// The number of attempts
        /// </summary>
        /// <example>1</example>
        public int attempts { get; set; }

        /// <summary> 
        /// Indicate if the user won
        /// </summary>
        /// <example>false</example>
        public bool win { get; set; }
    }
}
