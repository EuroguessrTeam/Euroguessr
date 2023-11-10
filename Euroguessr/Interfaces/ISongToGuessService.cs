using Euroguessr.Data.Tables;

namespace Euroguessr.Interfaces;

public interface ISongToGuessService
{
    public int GetSongToGuess();

    public void SetSongToGuess(Song song);
}