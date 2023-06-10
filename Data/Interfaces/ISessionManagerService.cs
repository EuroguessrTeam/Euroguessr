using Euroguessr.Models.Index;

namespace Euroguessr.Data.Interfaces
{
    public interface ISessionManagerService
    {
        public UserData SetData(UserData data);
        public UserData GetData();
    }
}
