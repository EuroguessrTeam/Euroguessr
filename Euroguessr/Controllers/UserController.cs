using Euroguessr.Data;
using Euroguessr.Models.Api.Song.Output;
using Euroguessr.Models.Api.User.Input;
using Euroguessr.Models.Api.User.Output;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Euroguessr.Controllers
{
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

        [HttpGet("/user")]
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

        [HttpGet("/user/scores")]
        [Produces("application/json")]
        public ActionResult GetCurrentUserScores()
        {
            try
            {
                var response = _context.Score.FirstOrDefault();
                return new JsonResult(response);
            }
            catch (Exception e)
            {
                _logger.LogError(e.ToString());
                return BadRequest("Something went wrong...");
            }
        }

        [HttpPost("/user/restore")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public ActionResult RestoreAccount(InputRestoreAccountModel user)
        {
            try
            {
                var response = new OutputSubmitSong();

                if (_accountManagerService.SetAccount(user.user))
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
