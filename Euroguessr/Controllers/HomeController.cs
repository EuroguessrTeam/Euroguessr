﻿using Euroguessr.Data;
using Euroguessr.Data.Tables;
using Euroguessr.Models;
using Euroguessr.Models.Pages.Account;
using Euroguessr.Models.Pages.Index;
using Euroguessr.Models.Pages.Training;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Net;
using Euroguessr.Interfaces;

namespace Euroguessr.Controllers
{
    public class HomeController : Controller
    {


        private readonly ILogger<HomeController> _logger;
        private readonly IAccountManagerService _accountManagerService;
        private readonly ISongManagerService _jsonManager;
        private readonly EntityContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ISongToGuessService _songToGuessService;

        public HomeController(ILogger<HomeController> logger, ISongManagerService jsonManagerService, IAccountManagerService accountManagerService, EntityContext context, IHttpContextAccessor httpContextAccessor, ISongToGuessService songToGuessService)
        {
            _logger = logger;
            _accountManagerService = accountManagerService;
            _jsonManager = jsonManagerService;
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

            Song todaySong = _jsonManager.GetTodayGuess();

            IndexModel model = new()
            {
                TodaySong = todaySong,
                SongsList = _jsonManager.GetSongsModel(),
                CurrentUserScore = _accountManagerService.GetOrSetTodayScore(currentUserId)
            };

            return View(model);
        }

        [ProducesResponseType((int)HttpStatusCode.OK)]
        public IActionResult Training()
        {
            _logger.LogInformation("Entrée dans Training");

            string randomSong = new Random().Next(3, 528).ToString();
            // randomSong = "527";

            Song song = _jsonManager.GetSong(randomSong);
            _songToGuessService.SetSongToGuess(song);
            
            TrainingModel model = new()
            {
                SongsList = _jsonManager.GetSongsModel(),
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