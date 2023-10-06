using Euroguessr.Data.Interfaces;
using Eurogessr.Models;
using Eurogessr.Models.Index;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Euroguessr.Data;
using Eurogessr.Models.Song;

namespace Eurogessr.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IJsonManagerService _jsonManager;
        private readonly ISessionManagerService _sessionManagerService;
        private readonly EntityContext _context;

        public HomeController(ILogger<HomeController> logger, IJsonManagerService jsonManagerService, ISessionManagerService sessionManagerService, EntityContext context)
        {
            _logger = logger;
            _jsonManager = jsonManagerService;
            _sessionManagerService = sessionManagerService;
            _context = context;
        }

        public IActionResult Index()
        {
            _logger.LogInformation("Entrée dans Index V2");

            var test = _context.User;

            SongModel todaySong = _jsonManager.GetTodayGuess();

            IndexModel model = new()
            {
                YoutubeVideo = new()
                {
                    VideoId = todaySong.Video_Id,
                    SeekTo = todaySong.Seek_To
                },
                SongsList = _jsonManager.GetSongsModel(),
                userData = _sessionManagerService.GetData()
            };

            return View(model);
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