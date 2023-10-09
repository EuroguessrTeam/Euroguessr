using Euroguessr.Data.Tables;

namespace Euroguessr.Data.Interfaces
{
    public interface IAccountManagerService
    {
        public string GetOrCreateNewAccount();
        public bool SetAccount(string accountId);
        public List<Score> GetScores(string userId);
        public Score GetOrSetTodayScore(string userId);
    }
}