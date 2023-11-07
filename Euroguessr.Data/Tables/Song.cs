using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Euroguessr.Data.Tables
{
    public class Song
    {
        [Required]
        [Key]
        public int id { get; set; }

        [Required]
        public Int16 year { get; set; }

        [Required]
        public string country { get; set; }

        [Required]
        public string artist_name { get; set; }

        [Required]
        public string song_name { get; set; }

        [Required]
        [MaxLength(11)]
        public string video_id { get; set; }

        [Required]
        public Int16 seek_to {  get; set; }

        [NotMapped]
        public string DisplayName => string.Format("{0} - {1} / {2} {3}", artist_name, song_name, country, year);
    }
}
