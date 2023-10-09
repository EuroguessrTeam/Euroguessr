using Euroguessr.Data.Interfaces;
using Euroguessr.Models.Song;
using Euroguessr.Models.TodayGuess;
using Microsoft.AspNetCore.Mvc;
using Euroguessr.Data;
using Euroguessr.Data.Tables;

namespace Euroguessr.Controllers
{
    public class FormManager : Controller
    {
        private readonly ILogger<FormManager> _logger;
        private readonly EntityContext _context;
        private readonly IAccountManagerService _accountManagerService;
        private readonly IJsonManagerService _jsonManager;

        public FormManager(ILogger<FormManager> logger, IJsonManagerService jsonManagerService, IAccountManagerService accountManagerService, EntityContext context)
        {
            _logger = logger;
            _context = context;
            _accountManagerService = accountManagerService;
            _jsonManager = jsonManagerService;
        }

        [HttpPost]
        public IActionResult OnFormSubmit(string selectedSong)
        {

            string currentUserId = _accountManagerService.GetAccount();
            Score todayScorePlayer = _accountManagerService.GetOrSetTodayScore(currentUserId);

            if (!todayScorePlayer.win)
            {

                if (String.IsNullOrEmpty(selectedSong))
                {
                    TempData["DisplayMessage"] = "Please enter your guess in the text box above";
                    goto end;
                }

                SongModel todayGuess = _jsonManager.GetTodayGuess();
                SongModel todaySong = _jsonManager.GetSong(todayGuess.Id);

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
    }
}
