using Euroguessr.Data;
using Euroguessr.Data.Tables;

namespace Euroguessr.Models.Pages.Training
{
    public class TrainingModel
    {
        public Song SongToGuess { get; set; } = new();
        public List<Song> SongsList { get; set; } = new();
    }
}
