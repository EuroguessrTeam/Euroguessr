using Euroguessr.Data;
using Euroguessr.Data.Tables;
using Euroguessr.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Euroguessr.Managers
{
    public class ActionButtonsManager : Controller
    {
        private readonly ILogger<FormManager> _logger;
        private readonly EntityContext _context;
        private readonly IAccountManagerService _accountManagerService;
        private readonly ISongManagerService _jsonManager;
        private readonly ISongToGuessService _songToGuessService;

        public ActionButtonsManager(ILogger<FormManager> logger, ISongManagerService jsonManagerService, IAccountManagerService accountManagerService, EntityContext context, ISongToGuessService songToGuessService)
        {
            _logger = logger;
            _context = context;
            _accountManagerService = accountManagerService;
            _jsonManager = jsonManagerService;
            _songToGuessService = songToGuessService;
        }

        [HttpPost("/SubmitSong")]
        [NonAction]
        public JsonResult SubmitSong([FromBody] string songId)
        {
            int id = _songToGuessService.GetSongToGuessId();
            Song song = _jsonManager.GetSong(id.ToString());

            if (songId == song.id.ToString())
            {
                return Json("Right");
            }
            else
            {
                return Json("Wrong");
            }
        }

        [NonAction]
        public IActionResult NextSong()
        {
            Console.WriteLine("Go to the next song...");
            return RedirectToAction("Training", "Home");
        }
    }
}
