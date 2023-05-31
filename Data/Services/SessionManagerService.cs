using Euroguessr.Data.Services.Interfaces;
using Euroguessr.Models.Index;
using System.Text.Json;

namespace Eurogessr.Data.Services
{
    public class SessionManagerService : ISessionManagerService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SessionManagerService(IHttpContextAccessor httpContextAccessor) {

            _httpContextAccessor = httpContextAccessor;
        }

        public UserData SetData(UserData data)
        {
            string serializedData = JsonSerializer.Serialize(data);
            _httpContextAccessor.HttpContext.Session.SetString("UserData", serializedData);
            return data;
        }

        public UserData GetData()
        {
            HttpContext context = _httpContextAccessor.HttpContext;
            string serializedData = context.Session.GetString("UserData");

            if (serializedData != null)
            {
                return JsonSerializer.Deserialize<UserData>(serializedData);
            }

            return new UserData()
            {
                DisplayMessage = "",
                NbTentatives = 0,
                IsWin = false
            };
        }
    }
}
