using Common.CustomException;
using Euroguessr.Data.Tables;
using Microsoft.AspNetCore.Http;

namespace Euroguessr.Data
{
    public class AccountService(EntityContext context, ISongService songService) : IAccountService
    {
        private readonly EntityContext _context = context;
        private readonly ISongService _songService = songService;


        /// <summary>
        /// Creates a new account and returns the unique id of the new account
        /// </summary>
        /// <returns></returns>
        public string CreateNewAccount()
        {
            //Generate the unique id for the new user
            string currentUser = Guid.NewGuid().ToString();

            //Save the new user to the database
            AccountDto newUser = new()
            {
                id = currentUser
            };
            _context.account.Add(newUser);
            _context.SaveChanges();

            //Return the id of the new user
            return currentUser;
        }

        public List<DailyScoreDto> GetScores(string accountId, DateOnly date)
        {
            if (!AccountExists(accountId))
            {
                throw new AccountNotFoundException(accountId);
            }

            return _context.daily_score.Where(s => s.account_id == accountId && s.date.Month.CompareTo(date.Month) == 0 && s.date.Year.CompareTo(date.Year) == 0).OrderByDescending(s => s.date).ToList();
        }

        public DailyScoreDto GetOrSetTodayScore(string accountId)
        {
            if (!AccountExists(accountId))
            {
                throw new AccountNotFoundException(accountId);
            }

            DateOnly todayDate = DateOnly.FromDateTime(DateTime.Now.ToUniversalTime());
            DailyScoreDto todayScore = _context.daily_score.Where(s => s.account_id == accountId && s.date == todayDate).FirstOrDefault();

            if (todayScore == null)
            {
                todayScore = new()
                {
                    account_id = accountId,
                    date = todayDate,
                    attempts = 0,
                    win = false
                };
                _context.daily_score.Add(todayScore);
                _context.SaveChanges();
            }

            return todayScore;
        }

        public TrainingScoreDto GetOrSetTrainingScore(string accountId)
        {
            if (!AccountExists(accountId))
            {
                throw new AccountNotFoundException(accountId);
            }

            TrainingScoreDto latestScore = _context.training_score.Where(s => s.account_id == accountId).OrderByDescending(s => s.date).FirstOrDefault();

            if (latestScore == null)
            {
                var randomSong = _songService.GetRandomSong();
                latestScore = new()
                {
                    account_id = accountId,
                    date = DateTime.UtcNow,
                    song_id = randomSong.id,
                    attempts = 0,
                    win = false
                };
                _context.training_score.Add(latestScore);
                _context.SaveChanges();
            }

            return latestScore;
        }


        public bool SubmitTodayGuess(int songId, string accountId)
        {
            if (!AccountExists(accountId))
            {
                throw new AccountNotFoundException(accountId);
            }

            DailyScoreDto todayScore = GetOrSetTodayScore(accountId);

            // If the user already guessed the song, we don't increment the attempts
            if (!todayScore.win) { todayScore.attempts++; };

            bool win = _songService.GetTodayGuess().id == songId;

            // If the user guessed the song for the first time, we set the win to true
            _ = win ? (todayScore.win = true) : (todayScore.win ? todayScore.win = true : todayScore.win = false);

            _context.daily_score.Update(todayScore);
            _context.SaveChanges();

            return win;
        }

        public bool SubmitTrainingGuess(int songId, string accountId)
        {
            if (!AccountExists(accountId))
            {
                throw new AccountNotFoundException(accountId);
            }

            var currentGuess = GetOrSetTrainingScore(accountId);

            bool win = false;
            if (currentGuess.song_id == songId)
            {
                win = true;
            }

            if (!currentGuess.win) { currentGuess.attempts++; };

            _ = win ? (currentGuess.win = true) : (currentGuess.win ? currentGuess.win = true : currentGuess.win = false);

            _context.training_score.Update(currentGuess);
            _context.SaveChanges();

            return win;
        }

        public bool AccountExists(string? accountId)
        {
            return accountId != null && _context.account.Where(u => u.id == accountId).Any();
        }

        public SongDto GetTrainingSong(string accountId, bool next)
        {
            if (!AccountExists(accountId))
            {
                throw new AccountNotFoundException(accountId);
            }

            var currentGuess = _context.training_score.Where(s => s.account_id == accountId).OrderByDescending(s => s.date).FirstOrDefault();

            // We send a new song if :
            // - The user never played
            // OR
            // - The user already played and want a new song
            // OR
            // - The user already played and guessed the last song
            if (currentGuess == null || next || currentGuess.win)
            {
                var randomSong = _songService.GetRandomSong();
                _context.training_score.Add(new TrainingScoreDto()
                {
                    account_id = accountId,
                    date = DateTime.UtcNow,
                    song_id = randomSong.id,
                    attempts = 0,
                    win = false
                });
                _context.SaveChanges();
                return randomSong;
            }
            else
            {
                var currentGuessId = _context.training_score.Where(s => s.account_id == accountId).OrderByDescending(s => s.date).FirstOrDefault().song_id;
                return _context.song.Where(s => s.id == currentGuessId).FirstOrDefault();
            }
        }
    }
}
