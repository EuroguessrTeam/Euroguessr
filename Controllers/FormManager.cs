using Euroguessr.Data.Interfaces;
using Eurogessr.Models.Song;
using Eurogessr.Models.TodayGuess;
using Euroguessr.Models.Index;
using Microsoft.AspNetCore.Mvc;

namespace Eurogessr.Controllers
{
    public class FormManager : Controller
    {
        private readonly ILogger<FormManager> _logger;
        private readonly IJsonManagerService _jsonManager;
        private readonly ISessionManagerService _sessionManagerService;

        public FormManager(ILogger<FormManager> logger, IJsonManagerService jsonManagerService, ISessionManagerService sessionManagerService)
        {
            _logger = logger;
            _jsonManager = jsonManagerService;
            _sessionManagerService = sessionManagerService;
        }

        [HttpPost]
        public IActionResult OnFormSubmit(string selectedSong)
        {

            UserData userData = _sessionManagerService.GetData();

            if (!userData.IsWin)
            {
                SongModel todayGuess = _jsonManager.GetTodayGuess();
                SongModel todaySong = _jsonManager.GetSong(todayGuess.Id);

                bool isWin = todaySong.DisplayName == selectedSong;

                if (isWin)
                {
                    userData.NbTentatives++;
                    userData.DisplayMessage = String.Format("Great job ! You guess today's song in {0} attempts !", userData.NbTentatives);
                    userData.IsWin = true;
                    _sessionManagerService.SetData(userData);
                }
                else
                {
                    userData.NbTentatives++;
                    userData.DisplayMessage = "Your guess was not right.. Try again !";
                    _sessionManagerService.SetData(userData);
                }
            }
            return RedirectToAction("Index", "Home");
        }
    }
}
