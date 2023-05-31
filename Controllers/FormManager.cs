using Eurogessr.Data.Services.Interfaces;
using Eurogessr.Models.Song;
using Eurogessr.Models.TodayGuess;
using Microsoft.AspNetCore.Mvc;

namespace Eurogessr.Controllers
{
    public class FormManager : Controller
    {
        private readonly ILogger<FormManager> _logger;
        private readonly IJsonManagerService _jsonManager;

        public FormManager(ILogger<FormManager> logger, IJsonManagerService jsonManagerService)
        {
            _logger = logger;
            _jsonManager = jsonManagerService;
        }

        [HttpPost]
        public IActionResult OnFormSubmit(string selectedSong)
        {

            TodayGuessModel todayGuess = _jsonManager.GetTodayGuess();
            SongModel todaySong = _jsonManager.GetSong(todayGuess.TodaySongId);

            bool isWin = todaySong.DisplayName == selectedSong;

            int tentatives = HttpContext.Session.GetInt32("NbTentatives") ?? 0;

            if (isWin)
            {
                HttpContext.Session.SetString("CorrectGuess", String.Format("Bravo ! Tu as trouvé le son en {0} tentatives !", tentatives+1));
            }
            else
            {
                HttpContext.Session.SetInt32("NbTentatives", tentatives+1);
                HttpContext.Session.SetString("CorrectGuess", "Dommage.. réessaye");
            }

            return RedirectToAction("Index", "Home");
        }
    }
}
