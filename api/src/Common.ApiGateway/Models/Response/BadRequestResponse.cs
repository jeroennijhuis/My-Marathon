namespace ApiGateway.Models.Models.Response;

using Base;

public class BadRequestResponse : ApiGatewayResponse
{
    public BadRequestResponse() : base(HttpStatusCode.BadRequest)
    {
    }
}