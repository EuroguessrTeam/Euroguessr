using Euroguessr.Data;
using Euroguessr.Data.Tables;
using Euroguessr.Data.Views;
using Euroguessr.Models.Api.Error;
using Microsoft.AspNetCore.Mvc;

namespace Euroguessr.Controllers
{
    [Route("api/leaderboard")]
    [ApiController]
    public class LeaderBoardController : ControllerBase
    {
        private readonly ILeaderboardService _leaderboardService;

        public LeaderBoardController(ILeaderboardService leaderboardService)
        {
            _leaderboardService = leaderboardService;
        }

        /// <summary>
        /// Get the number of pages for a leaderboard type.
        /// </summary>
        /// <param name="type">DAILY or TRAINING</param>
        [HttpGet("pages")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError400), StatusCodes.Status400BadRequest)]
        public ActionResult<int> CountPages([FromQuery] LeaderboardType type)
        {
            var pages = _leaderboardService.CountLeaderboardPages(type);
            return Ok(pages);
        }

        /// <summary>
        /// Get a leaderboard page (10 entries).
        /// </summary>
        /// <param name="type">DAILY or TRAINING</param>
        /// <param name="page">1-based page index</param>
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(typeof(List<UsersLeaderboard>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError400), StatusCodes.Status400BadRequest)]
        public ActionResult<List<UsersLeaderboard>> GetLeaderboard(
            [FromQuery] LeaderboardType type,
            [FromQuery] int page = 1)
        {
            if (page < 1)
                return BadRequest(new OutputError400 { message = "page must be >= 1" });

            var leaderboard = _leaderboardService.GetLeaderboard(page, type);
            return Ok(leaderboard);
        }

        /// <summary>
        /// Get the leaderboard entry of the current user.
        /// </summary>
        /// <param name="type">DAILY or TRAINING</param>
        [HttpGet("me")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(UsersLeaderboard), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OutputError400), StatusCodes.Status400BadRequest)]
        public ActionResult<UsersLeaderboard> GetMe(
            [FromQuery] LeaderboardType type,
            [FromHeader(Name = "accountId")] string? accountId)
        {
            if (string.IsNullOrWhiteSpace(accountId))
                return BadRequest(new OutputError400 { message = "Missing header: accountId" });

            var entry = _leaderboardService.GetUserLeaderboardEntry(accountId, type);
            return Ok(entry);
        }
    }
}
