using System.Text.Json.Serialization;

namespace Euroguessr.Data.Views
{
    public class UsersLeaderboard
    {
        public int rank { get; set; }

        [JsonIgnore]
        public string id { get; set; }
        public string? username { get; set; }
        public int score { get; set; }
    }
}
