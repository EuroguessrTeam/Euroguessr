using Euroguessr.Data;

namespace Euroguessr.Models.Pages.Training
{
    public class TrainingModel
    {
        public SongModel SongToGuess { get; set; } = new();
        public List<SongModel> SongsList { get; set; } = new();
    }
}
