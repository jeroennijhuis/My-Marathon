namespace ApiGateway.Models.Extensions;

using Models.Request;

public static class ApiGatewayRequestExtensions
{
    public static bool IsMethod(this ApiGatewayRequest request, HttpMethod method)
    {
        Console.WriteLine(JsonSerializer.Serialize(request));
        return new HttpMethod(request.Context.Http.Method) == method;
    }

    public static TRequest DeserializeRequest<TRequest>(this ApiGatewayRequest request) 
        => JsonSerializer.Deserialize<TRequest>(request.Body!)!;
}