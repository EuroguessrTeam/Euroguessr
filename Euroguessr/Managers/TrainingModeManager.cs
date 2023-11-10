using Euroguessr.Data;
using Euroguessr.Data.Tables;
using Euroguessr.Interfaces;
using Euroguessr.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace Euroguessr.Managers
{
    public class TrainingModeManager : Controller
    {
        private readonly ILogger<FormManager> _logger;
        private readonly EntityContext _context;
        private readonly IAccountManagerService _accountManagerService;
        private readonly ISongManagerService _jsonManager;
        private readonly ISongToGuessService _songToGuessService;

        public TrainingModeManager(ILogger<FormManager> logger, ISongManagerService jsonManagerService, IAccountManagerService accountManagerService, EntityContext context, ISongToGuessService songToGuessService)
        {
            _logger = logger;
            _context = context;
            _accountManagerService = accountManagerService;
            _jsonManager = jsonManagerService;
            _songToGuessService = songToGuessService;
        }

        [HttpPost]
        public IActionResult SubmitSong(string songId)
        {
            int id = _songToGuessService.GetSongToGuess();
            Song song = _jsonManager.GetSong(id.ToString());

            if (songId == song.id.ToString())
            {
                return RedirectToAction("Training", "Home");
            }

            return new EmptyResult();
        }

        public IActionResult SkipSong()
        {
            Console.WriteLine($"Song skipped, + {"?"} seconds");
            return RedirectToAction("Training", "Home");
        }

        public IActionResult NextSong()
        {
            Console.WriteLine("Go to the next song...");
            return RedirectToAction("Training", "Home");
        }
    }
}
