using Microsoft.AspNetCore.Mvc;
using Euroguessr.Data;
using Euroguessr.Models.Api.Song.Output;
using Euroguessr.Data.Tables;
using Euroguessr.Models.Api.Error;

namespace Euroguessr.Controllers
{

    [Route("api/song")]
    [ApiController]
    public class SongController : Controller
    {

        private readonly EntityContext _context;
        private readonly ISongService _songService;
        private readonly ILogger<SongController> _logger;

        public SongController(EntityContext context, ISongService songService, ILogger<SongController> logger)
        {
            _context = context;
            _songService = songService;
            _logger = logger;
        }

        /// <summary>
        /// Get today's global song to guess
        /// </summary>
        /// <response code="200">The song to guess</response>
        [HttpGet("daily")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(OutputGetSongToGuessModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError429), StatusCodes.Status429TooManyRequests)]
        [ProducesResponseType(typeof(OutputError500), StatusCodes.Status500InternalServerError)]
        public ActionResult GetDailySong()
        {
            SongDto song = _songService.GetTodayGuess();

            OutputGetSongToGuessModel response = new()
            {
                video_id = song.video_id,
                seek_to = song.seek_to
            };

            return new JsonResult(response);
        }

        /// <summary>
        /// Search for songs
        /// </summary>
        /// <param name="rowsNumber">Number of songs per page. 25 if not specified</param>
        /// <param name="page">The page number > 0</param>
        /// <param name="searchTerm">The term to search for. Return all songs if not specified</param>
        /// <response code="200">The songs corresponding to the the search term</response>
        [HttpGet("search")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(List<SongDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError429), StatusCodes.Status429TooManyRequests)]
        [ProducesResponseType(typeof(OutputError500), StatusCodes.Status500InternalServerError)]
        public ActionResult SearchSongs(int page, int? rowsNumber, string? searchTerm = null)
        {
            List<SongDto> response = _songService.SearchSongs(searchTerm, page, rowsNumber ?? 25);

            return new OkObjectResult(response);
        }

        /// <summary>
        /// Count the number of songs for a specified search term
        /// </summary>
        /// <param name="searchTerm">The term to search for. Returns the total number of songs if not specified</param>
        /// <response code="200">The number of songs corresponding to the the search term</response>
        [HttpGet("count")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError429), StatusCodes.Status429TooManyRequests)]
        [ProducesResponseType(typeof(OutputError500), StatusCodes.Status500InternalServerError)]
        public ActionResult CountSongs(string? searchTerm)
        {
            int response = _songService.CountSongs(searchTerm);

            return new OkObjectResult(response);
        }
    }
}
