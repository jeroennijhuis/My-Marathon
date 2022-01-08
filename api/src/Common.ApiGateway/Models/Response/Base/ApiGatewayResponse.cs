// ReSharper disable UnusedMember.Global
namespace ApiGateway.Models.Models.Response.Base;

public abstract class ApiGatewayResponse
{
    protected ApiGatewayResponse(HttpStatusCode statusCode, object? body = default)
    {
        StatusCode = (int) statusCode;
        Headers = new ApiGatewayResponseHeaders();
        Body = JsonSerializer.Serialize(body);
    }

    [JsonPropertyName("statusCode")]
    public int StatusCode { get; init; }

    [JsonPropertyName("headers")] 
    public ApiGatewayResponseHeaders Headers { get; set; }

    [JsonPropertyName("body")]
    public string Body { get; }
}

public class ApiGatewayResponseHeaders
{
    [JsonPropertyName("Access-Control-Allow-Origin")]
    public static string AccessControlAllowOrigin => "*";

    [JsonPropertyName("Access-Control-Allow-Credentials")]
    public static bool AccessControlAllowCredentials => true;
}