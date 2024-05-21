namespace Euroguessr.Models.Api.Account.Output
{
    public class OutputGetCurrentPlayerLeaderboard
    {
        public int rank { get; set; }
        public int totalNumberOfPlayers { get; set; }
        public int totalNumberOfWins { get; set; }
    }
}
