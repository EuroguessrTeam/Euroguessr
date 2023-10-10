namespace Euroguessr.Models.Song
{
    public class SongModel
    {
        public string Id { get; set; }
        public string Year { get; set; }
        public string Country { get; set; }
        public string Artist_Name { get; set; }
        public string Song_Name { get; set; }
        public string Video_Id { get; set; }
        public string Seek_To { get; set; }
        public string DisplayName => String.Format("{0} - {1} / {2} {3}", Artist_Name, Song_Name, Country, Year);
    }
}
