using Euroguessr.Data.Tables;

namespace Euroguessr.Data
{
    public interface IAccountService
    {
        public string CreateNewAccount();
        public bool AccountExists(string? accountId);
        public List<DailyScoreDto> GetScores(string? accountId, DateOnly month);
        public DailyScoreDto GetOrSetTodayScore(string? accountId);
        public TrainingScoreDto GetOrSetTrainingScore(string? accountId);
        public bool SubmitTodayGuess(int songId, string? accountId);
        public SongDto GetTrainingSong(string? accountId, bool next);
        public bool SubmitTrainingGuess(int songId, string? accountId);
        public int GetPlayerDailyRank(string? accountId);
        public int GetPlayerDailyWins(string? accountId);
        public int GetPlayerTrainingRank(string? accountId);
        public int GetPlayerTrainingWins(string? accountId);
        public int GetTotalNumberOfPlayers();
    }
}