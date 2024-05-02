using Common.CustomException;
using Euroguessr.Models.Api.Error;

namespace Euroguessr.Middleware
{
    public class GlobalExceptionHandlerMiddleware(ILogger<GlobalExceptionHandlerMiddleware> _logger) : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (AccountNotFoundException ex)
            {                
                _logger.LogWarning($"The account with id '{ex.Message}' does not exist");

                context.Response.StatusCode = StatusCodes.Status400BadRequest;

                await context.Response.WriteAsJsonAsync(OutputError400.GetOutputError400(ex.Message));
            }
            catch (Exception ex)
            {
                _logger.LogError($"An unknown error occured while processing the request, Message : ${ex.Message}, StackTrace: ${ex.StackTrace}");

                context.Response.StatusCode = StatusCodes.Status500InternalServerError;

                await context.Response.WriteAsJsonAsync(OutputError500.GetOutputError500());
            }
        }
    }
}
