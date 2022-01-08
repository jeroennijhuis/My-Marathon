// ReSharper disable UnusedParameter.Local
namespace Lambda.Functions.AccessToken;

using Models.Request;
using Strava;
using Strava.Models;

public class Function 
{
    /// <summary>
    /// The main entry point for the custom runtime.
    /// </summary>
    /// <param name="args"></param>
    private static async Task Main(string[] args)
    {
        var handler = FunctionHandler;
        await LambdaBootstrapBuilder.Create(handler, new DefaultLambdaJsonSerializer())
            .Build()
            .RunAsync();
    }

    private static IConfiguration GetConfiguration()
    {
        return new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();
    }

    /// <summary>
    /// Retrieves the access and refresh token using a provided authorization code.
    /// </summary>
    /// <param name="apiGatewayRequest">API Gateway trigger request</param>
    /// <param name="context"></param>
    /// <returns></returns>
    public static ApiGatewayResponse FunctionHandler(ApiGatewayRequest apiGatewayRequest, ILambdaContext context)
    {
        try
        {
            if (apiGatewayRequest.IsMethod(HttpMethod.Options))
            {
                return new OkResponse();
            }

            var request = apiGatewayRequest.DeserializeRequest<AccessTokenRequest>();

            var config = GetConfiguration();
            using var client = new StravaClient(config, context.Logger);
            var task = client.GetAccessToken(request.Code);

            task.Wait();

            context.Logger.LogInformation("Succesfully retrieved access token.");

            var response = new OkResponse<AccessTokenResponse>(task.Result);
            return response;
        }
        catch (Exception e)
        {
            context.Logger.LogError(e.Message);
            return new BadRequestResponse();
        }
    }
}