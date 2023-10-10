using Euroguessr.Data.Tables;

namespace Euroguessr.Models.Pages.Account
{
    public class ManageAccountModel
    {
        public string UserUniqueId { get; set; }
        public List<Score> Scores { get; set; }
    }
}
