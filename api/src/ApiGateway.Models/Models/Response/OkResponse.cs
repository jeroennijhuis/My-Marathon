namespace ApiGateway.Models.Models.Response;

using Base;

public class OkResponse<T> : ApiGatewayResponse
{
    public OkResponse(T body) : base(HttpStatusCode.OK, body)
    {
    }
}

public class OkResponse : ApiGatewayResponse
{
    public OkResponse() : base(HttpStatusCode.OK)
    {
    }
}