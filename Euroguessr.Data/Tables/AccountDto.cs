using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Euroguessr.Data.Tables
{
    public class AccountDto
    {
        [Key]
        [MaxLength(36)]
        public string id { get; set; }

        [MaxLength(50)]
        public string? username { get; set; }

        [JsonIgnore]
        public List<DailyScoreDto> daily_scores { get; set; }

        [JsonIgnore]
        public List<TrainingScoreDto> training_scores { get; set; }
    }
}