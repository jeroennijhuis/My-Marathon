#pragma warning disable CS8618
namespace ApiGateway.Models.Models.Request;

public class ApiGatewayRequest
{
    public ApiGatewayRequest()
    {
        Context = new RequestContext();
    }

    [JsonPropertyName("body")]
    public string? Body { get; set; }

    [JsonPropertyName("requestContext")]
    public RequestContext Context { get; set; }
}

public class RequestContext
{
    public RequestContext()
    {
        Http = new HttpContext();
    }

    [JsonPropertyName("http")]
    public HttpContext Http { get; set; }
}

public class HttpContext
{
    [JsonPropertyName("method")]
    public string Method { get; set; }
}