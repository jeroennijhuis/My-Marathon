namespace Strava.API.Filters.Authentication;

using Constants;
using NSwag;
using NSwag.Generation.Processors;
using NSwag.Generation.Processors.Contexts;

public class AddAuthenticationHeaders : IOperationProcessor
{
    public bool Process(OperationProcessorContext context)
    {
        context.OperationDescription.Operation.Parameters.Add(
            new OpenApiParameter()
            {
                Name = HttpHeaders.StravaAccessToken,
                Kind = OpenApiParameterKind.Header,
                Type = NJsonSchema.JsonObjectType.String,
                IsRequired = false,
                Description = "non-expired Strava access token"
            });

        context.OperationDescription.Operation.Parameters.Add(
            new OpenApiParameter()
            {
                Name = HttpHeaders.StravaAtleteId,
                Kind = OpenApiParameterKind.Header,
                Type = NJsonSchema.JsonObjectType.String,
                IsRequired = false,
                Description = "Strava athlete ID"
            });

        return true;
    }
}