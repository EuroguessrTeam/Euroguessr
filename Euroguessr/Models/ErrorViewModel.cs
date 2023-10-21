namespace Euroguessr.Models
{
    public class ErrorviewModel
    {
        public string? RequestId { get; set; }

        public bool HasRequestId => !string.IsNullOrEmpty(RequestId);
    }
}