using Euroguessr.Data.Interfaces;
using Euroguessr.Data.Tables;
using Microsoft.Extensions.Options;

namespace Euroguessr.Data.Services
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

        public void SetAccount()
        {

            var currentUser = _httpContextAccessor.HttpContext.Request.Cookies["Euroguessr_Account_Id"];

            //If the current user don't have an account (don't have the cookie "Euroguessr_Account_Id")
            if (string.IsNullOrWhiteSpace(currentUser) )
            {

                //Generate the unique id for the new user
                string uniqueAccountId = Guid.NewGuid().ToString();

                //Create the cookie for the authentification
                CookieOptions options = new()
                {
                    Expires = DateTime.Now.AddYears(100),
                    IsEssential = true,
                    Path = "/"
                };
                _httpContextAccessor.HttpContext.Response.Cookies.Append("Euroguessr_Account_Id", uniqueAccountId, options);

                //Save the new user to the database
                User newUser = new()
                {
                    unique_token = uniqueAccountId
                };
                _context.User.Add(newUser);
                _context.SaveChangesAsync();
            }
        }
        public string GetAccount()
        {
            return _httpContextAccessor.HttpContext.Request.Cookies["Euroguessr_Account_Id"];
        }

        public List<Score> GetScores(string userId)
        {
            return _context.Score.Where(s => s.Userunique_token == userId).ToList();
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
