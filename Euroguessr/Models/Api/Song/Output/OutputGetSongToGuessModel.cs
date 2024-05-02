namespace Euroguessr.Models.Api.Song.Output
{
    public class OutputGetSongToGuessModel
    {
        /// <summary>
        /// The youtube video id of the song to guess
        /// </summary>
        /// <example>dQw4w9WgXcQ</example>
        public string video_id { get; set; }

        /// <summary>
        /// The timecode in seconds to start the video from
        /// </summary>
        /// <example>0</example>
        public int seek_to { get; set; }
    }
}
