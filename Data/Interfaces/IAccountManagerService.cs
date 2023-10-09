using Euroguessr.Data.Tables;

namespace Euroguessr.Data.Interfaces
{
    public interface IAccountManagerService
    {
        public void SetAccount();
        public string GetAccount();
        public List<Score> GetScores(string userId);
        public Score GetOrSetTodayScore(string userId);
    }
}