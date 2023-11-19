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

        public SongController(EntityContext context, ISongManagerService songManagerService, ISongToGuessService songToGuessService)
        {
            _context = context;
            _songManagerService = songManagerService;
            _songToGuessService = songToGuessService;
        }


        [HttpGet("/song/daily")]
        [Produces("application/json")]
        public JsonResult GetDailySong()
        {
            Song song = _songManagerService.GetTodayGuess();

            OutputGetSongToGuessModel response = new()
            {
                video_id = song.video_id,
                seek_to = song.seek_to
            };

            return new JsonResult(response);
        }

        [HttpPost("/song/daily/submit")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public JsonResult SubmitDailySong(InputSubmitSongModel input)
        {
            int idToGuess = _songManagerService.GetTodayGuess().id;

            return new JsonResult(new OutputSubmitSong { result = input.id == idToGuess });
        }

        [HttpGet("/song/training")]
        [Produces("application/json")]
        public JsonResult GetTrainingSong()
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

        [HttpPost("/song/training/submit")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public JsonResult SubmitTrainingSong(InputSubmitSongModel input)
        {
            int idToGuess = _songToGuessService.GetSongToGuessId();

            return new JsonResult(new OutputSubmitSong { result = input.id == idToGuess });
        }

        [HttpGet("/songs")]
        [Produces("application/json")]
        public JsonResult GetSongs()
        {
            var response = _context.Song.OrderByDescending(c => c.id).ToArray();

            return new JsonResult(response);
        }
    }
}
