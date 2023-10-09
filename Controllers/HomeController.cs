using Euroguessr.Data.Interfaces;
using Euroguessr.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Euroguessr.Data;
using Euroguessr.Models.Song;
using Euroguessr.Data.Tables;
using Euroguessr.Models.Pages.Index;
using Euroguessr.Models.Pages.Account;

namespace Euroguessr.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IAccountManagerService _accountManagerService;
        private readonly IJsonManagerService _jsonManager;
        private readonly EntityContext _context;

        public HomeController(ILogger<HomeController> logger, IJsonManagerService jsonManagerService, IAccountManagerService accountManagerService, EntityContext context)
        {
            _logger = logger;
            _accountManagerService = accountManagerService;
            _jsonManager = jsonManagerService;
            _context = context;
        }

        public IActionResult Index()
        {
            _logger.LogInformation("Entrée dans Index V2");

            _accountManagerService.SetAccount();
            string currentUserId = _accountManagerService.GetAccount();

            SongModel todaySong = _jsonManager.GetTodayGuess();

            IndexModel model = new()
            {
                YoutubeVideo = new()
                {
                    VideoId = todaySong.Video_Id,
                    SeekTo = todaySong.Seek_To
                },
                SongsList = _jsonManager.GetSongsModel(),
                CurrentUserScore = _accountManagerService.GetOrSetTodayScore(currentUserId)
            };

            return View(model);
        }

        public IActionResult Account()
        {
            string currentUserId = _accountManagerService.GetAccount();
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
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}