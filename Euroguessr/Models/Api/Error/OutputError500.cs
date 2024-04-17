namespace Euroguessr.Models.Api.Error
{
    public class OutputError500
    {
        /// <summary>
        /// Code of the error
        /// </summary>
        /// <example>500</example>
        public int code { get; set; }

        /// <summary>
        /// Simple description of the error
        /// </summary>
        /// <example>An unknown error occurred. Please try again later...</example>
        public string message { get; set; }

        public static OutputError500 GetOutputError500()
        {
            return new OutputError500()
            {
                code = 500,
                message = "An unknown error occurred. Please try again later..."
            };
        }
    }
}
