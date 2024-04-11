using Euroguessr.Data;
using Euroguessr.Models.Api.Song.Output;
using Euroguessr.Models.Api.User.Output;
using Microsoft.AspNetCore.Mvc;

namespace Euroguessr.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {

        private readonly EntityContext _context;
        private readonly IAccountManagerService _accountManagerService;
        private readonly ILogger<UserController> _logger;

        public UserController(EntityContext context, IAccountManagerService accountManagerService, ILogger<UserController> logger)
        {
            _context = context;
            _accountManagerService = accountManagerService;
            _logger = logger;
        }

        [HttpGet]
        [Produces("application/json")]
        public ActionResult GetCurrentUserId()
        {
            try 
            {
                OutputGetUserIdModel response = new()
                {
                    user = _accountManagerService.GetOrCreateNewAccount()
                };
                return new JsonResult(response);
            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
                return BadRequest("Something went wrong...");
            }
        }

        [HttpGet("scores")]
        [Produces("application/json")]
        public ActionResult GetCurrentUserScores()
        {
            try
            {
                var response = _accountManagerService.GetScores(_accountManagerService.GetOrCreateNewAccount());
                return new JsonResult(response);
            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
                return BadRequest("Something went wrong...");
            }
        }

        [HttpGet("score/today")]
        [Produces("application/json")]
        public ActionResult GetCurrentUserTodayScore()
        {
            try
            {
                var response = _accountManagerService.GetOrSetTodayScore(_accountManagerService.GetOrCreateNewAccount());
                return new JsonResult(response);
            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
                return BadRequest("Something went wrong...");
            }
        }

        [HttpPost("guess/send")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public ActionResult SendTodayGuess(int id)
        {
            try
            {
                bool isGuessCorrect = _accountManagerService.SubmitTodayGuess(id);

                return new JsonResult(new OutputSubmitSong { result = isGuessCorrect });
            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
                return BadRequest("Something went wrong...");
            }
        }

        [HttpPost("restore")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public ActionResult RestoreAccount(string userId)
        {
            try
            {
                var response = new OutputSubmitSong();

                if (_accountManagerService.SetAccount(userId))
                {
                    response.result = true;
                }
                else
                {
                    response.result = false;
                }

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
