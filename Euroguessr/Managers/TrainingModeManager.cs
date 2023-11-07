using Euroguessr.Data;
using Microsoft.AspNetCore.Mvc;

namespace Euroguessr.Managers
{
    public class TrainingModeManager : Controller
    {
        private readonly ILogger<FormManager> _logger;
        private readonly EntityContext _context;
        private readonly IAccountManagerService _accountManagerService;
        private readonly IJsonManagerService _jsonManager;

        public TrainingModeManager(ILogger<FormManager> logger, IJsonManagerService jsonManagerService, IAccountManagerService accountManagerService, EntityContext context)
        {
            _logger = logger;
            _context = context;
            _accountManagerService = accountManagerService;
            _jsonManager = jsonManagerService;
        }

        [HttpPost]
        public IActionResult SubmitSong(string songId)
        {
            Console.WriteLine($"Song selected : {songId}");
            return RedirectToAction("Training", "Home");
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
