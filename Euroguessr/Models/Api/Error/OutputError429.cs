namespace Euroguessr.Models.Api.Error
{
    public class OutputError429
    {
        /// <summary>
        /// Code of the error
        /// </summary>
        /// <example>429</example>
        public int code { get; set; } = 429;

        /// <summary>
        /// Simple description of the error
        /// </summary>
        /// <example>Quota exceeded. Maximum allowed: XX per Xh. Please try again in XXXX second(s).</example>
        public string message { get; set; }
    }
}
