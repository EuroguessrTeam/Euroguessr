using Euroguessr.Data;
using Euroguessr.Models.Api.Song.Output;
using Euroguessr.Models.Api.User.Input;
using Euroguessr.Models.Api.User.Output;
using Microsoft.AspNetCore.Mvc;

namespace Euroguessr.Controllers
{
    public class UserController : Controller
    {

        private readonly EntityContext _context;

        public UserController(EntityContext context)
        {
            _context = context;
        }

        [HttpGet("/user")]
        [Produces("application/json")]
        public JsonResult GetCurrentUserId()
        {
            OutputGetUserIdModel response = new()
            {
                user = Guid.NewGuid()
            };

            return new JsonResult(response);
        }

        [HttpGet("/user/scores")]
        [Produces("application/json")]
        public JsonResult GetCurrentUserScores()
        {
            var response = _context.Score.FirstOrDefault();

            return new JsonResult(response);
        }

        [HttpPost("/user/restore")]
        [Consumes("application/json")]
        [Produces("application/json")]
        public JsonResult RestoreAccount(InputRestoreAccountModel user)
        {
            var response = new OutputSubmitSong();

            if (new Random().Next(0, 2) == 0)
            {
                response.result = false;
            }
            else
            {
                response.result = true;
            }

            return new JsonResult(response);
        }
    }
}
