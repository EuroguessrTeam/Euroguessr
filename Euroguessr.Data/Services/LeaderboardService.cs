using Common.CustomException;
using Euroguessr.Data.Tables;
using Euroguessr.Data.Views;

namespace Euroguessr.Data
{
    public class LeaderboardService(EntityContext context) : ILeaderboardService
    {
        private readonly EntityContext _context = context;

        public int CountLeaderboardPages(LeaderboardType leaderboardType)
        {
            if (leaderboardType == LeaderboardType.DAILY)
            {
                int totalEntries = _context.users_leaderboard_daily.Count();
                return (int)Math.Ceiling((double)totalEntries / 10);
            }
            else if (leaderboardType == LeaderboardType.TRAINING)
            {
                int totalEntries = _context.users_leaderboard_training.Count();
                return (int)Math.Ceiling((double)totalEntries / 10);
            }
            else
            {
                throw new Exception("Leaderboard type not found");
            }
        }

        public List<UsersLeaderboard> GetLeaderboard(int page, LeaderboardType leaderboardType)
        {
            if (leaderboardType == LeaderboardType.DAILY)
            {
                return [.. _context.users_leaderboard_daily
                    .OrderBy(ul => ul.rank)
                    .Skip((page - 1) * 10)
                    .Take(10)
                    .Select(ul => new UsersLeaderboard
                    {
                        rank = ul.rank,
                        id = ul.id,
                        username = ul.username,
                        score = ul.score
                    })];
            }
            else if (leaderboardType == LeaderboardType.TRAINING)
            {
                return [.. _context.users_leaderboard_training
                    .OrderBy(ul => ul.rank)
                    .Skip((page - 1) * 10)
                    .Take(10)
                    .Select(ul => new UsersLeaderboard
                    {
                        rank = ul.rank,
                        id = ul.id,
                        username = ul.username,
                        score = ul.score
                    })];
            }

            throw new Exception("Leaderboard type not found");
        }

        public UsersLeaderboard GetUserLeaderboardEntry(string accountId, LeaderboardType leaderboardType)
        {
            if (leaderboardType == LeaderboardType.DAILY)
            {
                var entry = _context.users_leaderboard_daily.Where(ul => ul.id == accountId).FirstOrDefault();
                if (entry == null)
                {
                    throw new Exception("User not found in daily leaderboard");
                }
                return new UsersLeaderboard
                {
                    rank = entry.rank,
                    id = entry.id,
                    username = entry.username,
                    score = entry.score
                };
            }
            else if (leaderboardType == LeaderboardType.TRAINING)
            {
                var entry = _context.users_leaderboard_training.Where(ul => ul.id == accountId).FirstOrDefault();
                if (entry == null)
                {
                    throw new Exception("User not found in training leaderboard");
                }
                return new UsersLeaderboard
                {
                    rank = entry.rank,
                    id = entry.id,
                    username = entry.username,
                    score = entry.score
                };
            }
            throw new Exception("Leaderboard type not found");
        }
    }
}
