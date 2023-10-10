namespace Euroguessr.Models.VideoManager
{
    public class YoutubeVideoModel
    {
        public string VideoId { get; set; }
        public string SeekTo { get; set; }

        private string Options = "?autoplay=1&controls=0&showinfo=0&rel=0";
        public string MusicUrl => "https://www.youtube.com/embed/" + VideoId + Options;
    }
}
