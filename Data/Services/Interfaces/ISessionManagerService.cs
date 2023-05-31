using Euroguessr.Models.Index;

namespace Euroguessr.Data.Services.Interfaces
{
    public interface ISessionManagerService
    {
        public UserData SetData(UserData data);
        public UserData GetData();
    }
}
