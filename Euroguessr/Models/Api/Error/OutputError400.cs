namespace Euroguessr.Models.Api.Error
{
    public class OutputError400
    {
        /// <summary>
        /// Code of the error
        /// </summary>
        /// <example>400</example>
        public int code { get; set; }

        /// <summary>
        /// Simple description of the error
        /// </summary>
        /// <example>The account with id 'xxxxx-xxxxx-xxxxx-xxxxx' does not exist</example>
        public string message { get; set; }

        public static OutputError400 GetOutputError400(string accountId)
        {
            return new OutputError400()
            {
                code = 400,
                message = $"The account with id '{accountId}' does not exist"
            };
        }
    }
}
