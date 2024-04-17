using Euroguessr.Data;
using Euroguessr.Models.Api.Song.Output;
using Euroguessr.Models.Api.Account.Output;
using Microsoft.AspNetCore.Mvc;
using Euroguessr.Models.Api.Error;
using Common.CustomException;
using System.ComponentModel.DataAnnotations;

namespace Euroguessr.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : Controller
    {

        private readonly EntityContext _context;
        private readonly IAccountService _accountService;
        private readonly ILogger<AccountController> _logger;

        public AccountController(EntityContext context, IAccountService accountService, ILogger<AccountController> logger)
        {
            _context = context;
            _accountService = accountService;
            _logger = logger;
        }

        /// <summary>
        /// Create a new account and return its unique id
        /// </summary>
        /// <returns>The unique id of the account created</returns>
        /// <response code="200">Account created</response>
        [HttpGet("new")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(OutputGetAccountModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError429), StatusCodes.Status429TooManyRequests)]
        [ProducesResponseType(typeof(OutputError500), StatusCodes.Status500InternalServerError)]
        public ActionResult CreateNewAccount()
        {
            OutputGetAccountModel response = new()
            {
                accountId = _accountService.CreateNewAccount()
            };

            return new JsonResult(response);
        }

        /// <summary>
        /// Check if an account exists with the given id
        /// </summary>
        /// <param name="accountId">The id to check</param>
        /// <response code="200">True if the account exists, false otherwise</response>
        [HttpGet("check")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(OutputAccountExists), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError429), StatusCodes.Status429TooManyRequests)]
        [ProducesResponseType(typeof(OutputError500), StatusCodes.Status500InternalServerError)]
        public ActionResult CheckIfAccountExists([FromHeader(Name = "accountId")] string? accountId)
        {
            var response = new OutputAccountExists()
            {
                accountExists = _accountService.AccountExists(accountId)
            };

            return new JsonResult(response);
        }

        /// <summary>
        /// Get all the daily scores of an account (for the month of the given date)
        /// </summary>
        /// <param name="accountId">The id of the account</param>
        /// <param name="month">One date of the month you want</param>
        /// <response code="200">The list of scores</response>
        /// <response code="400">Account not found</response>
        [HttpGet("daily/score/all")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(List<DailyScoreDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError400), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(OutputError429), StatusCodes.Status429TooManyRequests)]
        [ProducesResponseType(typeof(OutputError500), StatusCodes.Status500InternalServerError)]
        public ActionResult GetCurrentUserScores([FromHeader(Name = "accountId")] string? accountId, DateOnly month)
        {
            List<DailyScoreDto> response = _accountService.GetScores(accountId, month);

            return new JsonResult(response);
        }

        /// <summary>
        /// Get today's daily score of an account
        /// </summary>
        /// <param name="accountId">The id of the account</param>
        /// <response code="200">Today's daily score</response>
        /// <response code="400">Account not found</response>
        [HttpGet("daily/score/today")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(DailyScoreDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError400), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(OutputError429), StatusCodes.Status429TooManyRequests)]
        [ProducesResponseType(typeof(OutputError500), StatusCodes.Status500InternalServerError)]
        public ActionResult GetCurrentUserTodayScore([FromHeader(Name = "accountId")] string? accountId)
        {
            DailyScoreDto response = _accountService.GetOrSetTodayScore(accountId);

            return new JsonResult(response);
        }

        /// <summary>
        /// Submit today's guess
        /// </summary>
        /// <param name="accountId">The id of the account</param>
        /// <param name="songId">The id of the song</param>
        /// <response code="200">True if the guess is correct, false otherwise</response>
        /// <response code="400">Account not found</response>
        [HttpPost("daily/guess/submit")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(OutputSubmitSong), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError400), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(OutputError429), StatusCodes.Status429TooManyRequests)]
        [ProducesResponseType(typeof(OutputError500), StatusCodes.Status500InternalServerError)]
        public ActionResult SubmitTodayGuess([FromHeader(Name = "accountId")] string? accountId, int songId)
        {
            bool isGuessCorrect = _accountService.SubmitTodayGuess(songId, accountId);

            return new JsonResult(new OutputSubmitSong()
            {
                result = isGuessCorrect
            });
        }

        /// <summary>
        /// Get the last training score of an account
        /// </summary>
        /// <param name="accountId">The id of the account</param>
        /// <response code="200">The last training score</response>
        /// <response code="400">Account not found</response>
        [HttpGet("training/score/last")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(TrainingScoreDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError400), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(OutputError429), StatusCodes.Status429TooManyRequests)]
        [ProducesResponseType(typeof(OutputError500), StatusCodes.Status500InternalServerError)]
        public ActionResult GetCurrentUserTrainingScore([FromHeader(Name = "accountId")] string? accountId)
        {
            var response = _accountService.GetOrSetTrainingScore(accountId);

            return new JsonResult(response);
        }

        /// <summary>
        /// Submit training guess
        /// </summary>
        /// <param name="accountId">The id of the account</param>
        /// <param name="songId">The id of the song</param>
        /// <response code="200">True if the guess is correct, false otherwise</response>
        /// <response code="400">Account not found</response>
        [HttpPost("training/guess/submit")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(OutputSubmitSong), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError400), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(OutputError429), StatusCodes.Status429TooManyRequests)]
        [ProducesResponseType(typeof(OutputError500), StatusCodes.Status500InternalServerError)]
        public ActionResult SubmitTrainingGuess([FromHeader(Name = "accountId")] string? accountId, int songId)
        {
            bool isGuessCorrect = _accountService.SubmitTrainingGuess(songId, accountId);

            return new JsonResult(new OutputSubmitSong()
            { 
                result = isGuessCorrect 
            });
        }

        /// <summary>
        /// Get a random song to guess
        /// </summary>
        /// <param name="accountId">The id of the account</param>
        /// <param name="next">True if the user skipped the song to guess and wants a new one</param>
        /// <response code="200">The song to guess</response>
        /// <response code="400">Account not found</response>
        [HttpGet("training/guess/get")]
        [Consumes("application/json")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(OutputGetSongToGuessModel), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError400), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(OutputError429), StatusCodes.Status429TooManyRequests)]
        [ProducesResponseType(typeof(OutputError500), StatusCodes.Status500InternalServerError)]
        public ActionResult GetTrainingGuess([FromHeader(Name = "accountId")] string? accountId, [Required] bool next)
        {
            var response = _accountService.GetTrainingSong(accountId, next);

            return new JsonResult(new OutputGetSongToGuessModel()
            {
                video_id = response.video_id,
                seek_to = response.seek_to
            });
        }
    }
}
