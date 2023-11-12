using Euroguessr.Data;
using Euroguessr.Data.Tables;
using Euroguessr.Interfaces;
using Euroguessr.Models;
using Euroguessr.Models.Pages.Account;
using Euroguessr.Models.Pages.Index;
using Euroguessr.Models.Pages.Training;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net;

namespace Euroguessr.Controllers
{
    public class HomeController : Controller
    {


        private readonly ILogger<HomeController> _logger;
        private readonly IAccountManagerService _accountManagerService;
        private readonly ISongManagerService _songManager;
        private readonly EntityContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ISongToGuessService _songToGuessService;

        public HomeController(ILogger<HomeController> logger, ISongManagerService songManager, IAccountManagerService accountManagerService, EntityContext context, IHttpContextAccessor httpContextAccessor, ISongToGuessService songToGuessService)
        {
            _logger = logger;
            _accountManagerService = accountManagerService;
            _songManager = songManager;
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _songToGuessService = songToGuessService;
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        //[Route("/test")]
        public IActionResult Index()
        {
            _logger.LogInformation("Entrée dans Index V2");

            string currentUserId = _accountManagerService.GetOrCreateNewAccount();

            Song todaySong = _songManager.GetTodayGuess();

            IndexModel model = new()
            {
                TodaySong = todaySong,
                SongsList = _songManager.GetSongsModel(),
                CurrentUserScore = _accountManagerService.GetOrSetTodayScore(currentUserId)
            };

            return View(model);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        public IActionResult Training()
        {
            _logger.LogInformation("Entrée dans Training");

            Song song = _songManager.GetRandomSong();

            _songToGuessService.SetSongToGuess(song);

            TrainingModel model = new()
            {
                SongsList = _songManager.GetSongsModel(),
                SongToGuess = song
            };

            return View(model);
        }

        public IActionResult Account()
        {
            string currentUserId = _accountManagerService.GetOrCreateNewAccount();
            List<Score> scores = _accountManagerService.GetScores(currentUserId);

            ManageAccountModel model = new()
            {
                UserUniqueId = currentUserId,
                Scores = scores
            };

            return View(model);
        }

        public IActionResult Help()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorviewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}