using System.ComponentModel.DataAnnotations;

namespace Euroguessr.Models.Api.Account.Output
{
    public class OutputGetAccountModel
    {
        /// <summary>
        /// Unique id of the account
        /// </summary>
        /// <example>b11ecaba-72b6-4b4c-a7ea-7df24ed8c8ca</example>
        public string accountId { get; set; }
    }
}
