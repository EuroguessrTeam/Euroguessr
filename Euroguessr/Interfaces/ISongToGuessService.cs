using Euroguessr.Data.Tables;

namespace Euroguessr.Interfaces;

public interface ISongToGuessService
{
    public int GetSongToGuessId();

    public void SetSongToGuess(Song song);
}