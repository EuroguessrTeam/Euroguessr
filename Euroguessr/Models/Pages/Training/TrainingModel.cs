using Euroguessr.Data;
using Euroguessr.Data.Tables;

namespace Euroguessr.Models.Pages.Training
{
    public class TrainingModel
    {
        public SongDto SongToGuess { get; set; } = new();
        public List<SongDto> SongsList { get; set; } = new();
    }
}
