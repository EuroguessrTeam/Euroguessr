using Microsoft.AspNetCore.Http;

namespace Euroguessr.Data
{
    public class AccountManagerService : IAccountManagerService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly EntityContext _context;

        public AccountManagerService(IHttpContextAccessor httpContextAccessor, EntityContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }


        /// <summary>
        /// Get the current user account if he already had an account, otherwise it creates a new one.
        /// </summary>
        /// <returns></returns>
        public string GetOrCreateNewAccount()
        {

            string currentUser = _httpContextAccessor.HttpContext.Request.Cookies["Euroguessr_Account_Id"];

            //If the current user don't have an account (don't have the cookie "Euroguessr_Account_Id")
            if (string.IsNullOrWhiteSpace(currentUser) || !_context.User.Where(c => c.unique_token == currentUser).Any())
            {

                //Generate the unique id for the new user
                currentUser = Guid.NewGuid().ToString();

                //Create the cookie for the authentification
                CookieOptions options = new()
                {
                    Expires = DateTime.Now.AddYears(100),
                    IsEssential = true,
                };
                _httpContextAccessor.HttpContext.Response.Cookies.Append("Euroguessr_Account_Id", currentUser, options);

                //Save the new user to the database
                User newUser = new()
                {
                    unique_token = currentUser
                };
                _context.User.Add(newUser);
                _context.SaveChanges();
            }

            return currentUser;
        }
        public bool SetAccount(string accountId)
        {
            bool accountExists = _context.User.Where(u => u.unique_token == accountId).Any();
            if (!accountExists)
                return false;

            try
            {
                //Delete the actual cookie for the authentification
                _httpContextAccessor.HttpContext.Response.Cookies.Delete("Euroguessr_Account_Id");

                //Create the cookie for the authentification
                CookieOptions options = new()
                {
                    Expires = DateTime.Now.AddYears(100),
                    IsEssential = true,
                    Path = "/"
                };
                _httpContextAccessor.HttpContext.Response.Cookies.Append("Euroguessr_Account_Id", accountId, options);
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }

        public List<Score> GetScores(string userId)
        {
            return _context.Score.Where(s => s.Userunique_token == userId).OrderByDescending(s => s.date).ToList();
        }

        public Score GetOrSetTodayScore(string userId)
        {

            DateOnly todayDate = DateOnly.FromDateTime(DateTime.Now.ToUniversalTime());
            Score todayScorePlayer = _context.Score.Where(s => s.Userunique_token == userId && s.date == todayDate).FirstOrDefault();

            if (todayScorePlayer == null)
            {
                todayScorePlayer = new()
                {
                    Userunique_token = userId,
                    date = todayDate,
                    attempts = 0,
                    win = false
                };
                _context.Score.Add(todayScorePlayer);
                _context.SaveChanges();
            }

            return todayScorePlayer;
        }
    }
}
