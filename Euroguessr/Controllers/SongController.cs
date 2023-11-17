using Microsoft.AspNetCore.Mvc;
using Euroguessr.Models.Api.Song;

namespace Euroguessr.Controllers 
{
    public class SongController : Controller
    {
        public SongController() {
        }


        [HttpGet("/song/daily")]
        public JsonResult GetDailySong() {
            GetDailySongModel response = new() 
            {
                video_id = "iMu47raqbcc",
                seek_to = 10
            };

            return new JsonResult(response);
        }
    }
}
