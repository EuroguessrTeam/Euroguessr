using Eurogessr.Data.Services.Interfaces;
using Eurogessr.Models;
using Eurogessr.Models.Index;
using Eurogessr.Models.Song;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text.Json;

namespace Eurogessr.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IJsonManagerService _jsonManager;

        public HomeController(ILogger<HomeController> logger, IJsonManagerService jsonManagerService)
        {
            _logger = logger;
            _jsonManager = jsonManagerService;
        }

        public IActionResult Index()
        {
            _logger.LogInformation("Entrée dans Index V2");

            IndexModel model = new()
            {
                YoutubeVideo = new()
                {
                    VideoId = _jsonManager.GetTodayGuess().VideoId
                },
                SongsList = _jsonManager.GetSongsModel(),
                CorrectGuess = HttpContext.Session.GetString("CorrectGuess")
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