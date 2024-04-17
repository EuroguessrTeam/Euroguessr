using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Euroguessr.Data.Tables
{
    public class SongDto
    {
        /// <summary>
        /// The unique id of the song
        /// </summary>
        /// <example>580</example>
        [Required]
        [Key]
        public int id { get; set; }

        /// <summary>
        /// The year of the song
        /// </summary>
        /// <example>2024</example>
        [Required]
        public Int16 year { get; set; }

        /// <summary>
        /// The country of the song
        /// </summary>
        /// <example>Greece</example>
        [Required]
        public string country { get; set; }

        /// <summary>
        /// The name of the artist
        /// </summary>
        /// <example>Marina Satti</example>
        [Required]
        public string artist_name { get; set; }

        /// <summary>
        /// The full name of the song
        /// </summary>
        /// <example>Zari</example>
        [Required]
        public string song_name { get; set; }

        /// <summary>
        /// The youtube video id of the song
        /// </summary>
        /// <example>uTYalXf184A</example>
        [Required]
        [JsonIgnore]
        [MaxLength(11)]
        public string video_id { get; set; }

        /// <summary>
        /// The timecode in seconds to start the video from
        /// </summary>
        /// <example>0</example>
        [Required]
        [JsonIgnore]
        public Int16 seek_to {  get; set; }

        [JsonIgnore]
        public List<TrainingScoreDto> training_scores { get; set; }

        [JsonIgnore]
        public List<DailyGuessDto> daily_guesses { get; set; }

    }
}
