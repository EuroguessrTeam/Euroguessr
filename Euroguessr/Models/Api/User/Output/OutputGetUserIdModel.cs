using System.ComponentModel.DataAnnotations;

namespace Euroguessr.Models.Api.User.Output
{
    public class OutputGetUserIdModel
    {
        public Guid user { get; set; }
    }
}
