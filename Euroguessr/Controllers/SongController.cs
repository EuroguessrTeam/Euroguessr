using Microsoft.AspNetCore.Mvc;
using Euroguessr.Data;
using Euroguessr.Models.Api.Song.Input;
using Euroguessr.Models.Api.Song.Output;
using Euroguessr.Data.Tables;
using Euroguessr.Interfaces;

namespace Euroguessr.Controllers
{
    public class SongController : Controller
    {

        private readonly EntityContext _context;
        private readonly ISongManagerService _songManagerService;
        private readonly ISongToGuessService _songToGuessService;
        private readonly ILogger<SongController> _logger;

        public SongController(EntityContext context, ISongManagerService songManagerService, ISongToGuessService songToGuessService, ILogger<SongController> logger)
        {
            _context = context;
            _songManagerService = songManagerService;
            _songToGuessService = songToGuessService;
            _logger = logger;
        }


        [HttpGet("/song/daily")]
        [Produces("application/json")]
        public ActionResult GetDailySong()
        {
            try
            {
                Song song = _songManagerService.GetTodayGuess();

                OutputGetSongToGuessModel response = new()
                {
                    video_id = song.video_id,
                    seek_to = song.seek_to
                };

                return new JsonResult(response);
            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
                return BadRequest("Something went wrong...");
            }
        }

        [HttpPost("/song/daily/submit")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public ActionResult SubmitDailySong(InputSubmitSongModel input)
        {
            try
            {
                int idToGuess = _songManagerService.GetTodayGuess().id;

                return new JsonResult(new OutputSubmitSong { result = input.id == idToGuess });
            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
                return BadRequest("Something went wrong...");
            }
        }

        [HttpGet("/song/training")]
        [Produces("application/json")]
        public ActionResult GetTrainingSong()
        {
            try
            {
                Song songToGuess = _songManagerService.GetRandomSong();

                _songToGuessService.SetSongToGuess(songToGuess);

                OutputGetSongToGuessModel response = new()
                {
                    video_id = songToGuess.video_id,
                    seek_to = songToGuess.seek_to
                };

                return new JsonResult(response);
            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
                return BadRequest("Something went wrong...");
            }
        }

        [HttpPost("/song/training/submit")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public ActionResult SubmitTrainingSong(InputSubmitSongModel input)
        {
            try
            {
                int idToGuess = _songToGuessService.GetSongToGuessId();

                return new JsonResult(new OutputSubmitSong { result = input.id == idToGuess });
            } 
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
                return BadRequest("Something went wrong...");
            }
        }

        [HttpGet("/songs")]
        [Produces("application/json")]
        public ActionResult GetSongs()
        {
            try
            {
                var response = _context.Song.OrderByDescending(c => c.id).ToArray();

                return new JsonResult(response);
            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
                return BadRequest("Something went wrong...");
            }
        }
    }
}
