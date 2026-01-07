using Euroguessr.Data.Tables;
using Euroguessr.Data.Views;

namespace Euroguessr.Data
{
    public interface ILeaderboardService
    {
        public List<UsersLeaderboard> GetLeaderboard(int page, LeaderboardType leaderboardType);
        public int CountLeaderboardPages(LeaderboardType leaderboardType);
        public UsersLeaderboard GetUserLeaderboardEntry(string accountId, LeaderboardType leaderboardType);
    }

    public enum LeaderboardType
    {
        DAILY,
        TRAINING
    }
}