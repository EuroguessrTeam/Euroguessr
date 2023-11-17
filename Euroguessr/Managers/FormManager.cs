using Euroguessr.Data;
using Euroguessr.Data.Tables;
using Microsoft.AspNetCore.Mvc;

namespace Euroguessr.Managers
{
    public class FormManager : Controller
    {
        private readonly ILogger<FormManager> _logger;
        private readonly EntityContext _context;
        private readonly IAccountManagerService _accountManagerService;
        private readonly ISongManagerService _jsonManager;

        public FormManager(ILogger<FormManager> logger, ISongManagerService jsonManagerService, IAccountManagerService accountManagerService, EntityContext context)
        {
            _logger = logger;
            _context = context;
            _accountManagerService = accountManagerService;
            _jsonManager = jsonManagerService;
        }

        [HttpPost]
        [NonAction]
        public IActionResult OnFormSubmit(string selectedSong)
        {

            string currentUserId = _accountManagerService.GetOrCreateNewAccount();
            Score todayScorePlayer = _accountManagerService.GetOrSetTodayScore(currentUserId);

            if (!todayScorePlayer.win)
            {

                if (string.IsNullOrEmpty(selectedSong))
                {
                    TempData["DisplayMessage"] = "Please enter your guess in the text box above";
                    goto end;
                }

                Song todayGuess = _jsonManager.GetTodayGuess();
                Song todaySong = _jsonManager.GetSong(todayGuess.id.ToString());

                bool isWin = todaySong.DisplayName == selectedSong;

                if (isWin)
                {
                    todayScorePlayer.attempts++;
                    todayScorePlayer.win = true;
                    TempData["DisplayMessage"] = "";
                }
                else
                {
                    todayScorePlayer.attempts++;
                    TempData["DisplayMessage"] = "Your guess was not right.. Try again !";
                }
            }

        end:
            _context.Score.Update(todayScorePlayer);
            _context.SaveChanges();
            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        [NonAction]
        public IActionResult OnRestoreAccountSubmit(string accountId)
        {

            if (string.IsNullOrWhiteSpace(accountId))
            {
                TempData["DisplayMessageRestoreAccount"] = "Please enter a value";
            }

            bool response = _accountManagerService.SetAccount(accountId);

            if (response)
            {
                TempData["DisplayMessageRestoreAccount"] = "Your account has been successfully restored !";
            }
            else
            {
                TempData["DisplayMessageRestoreAccount"] = "The indicated account id does not exist :(";
            }

            return RedirectToAction("Account", "Home");
        }
    }
}