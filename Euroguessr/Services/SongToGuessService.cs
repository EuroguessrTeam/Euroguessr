using System.Text.Json.Serialization;
using Euroguessr.Data;
using Euroguessr.Data.Tables;
using Euroguessr.Interfaces;

namespace Euroguessr.Services;

public class SongToGuessService : ISongToGuessService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    

    public SongToGuessService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }
    
    public int GetSongToGuess()
    {
        return (int)_httpContextAccessor.HttpContext.Session.GetInt32("songId");
    }

    public void SetSongToGuess(Song song)
    {
        _httpContextAccessor.HttpContext.Session.SetInt32("songId", song.id);
    }
}