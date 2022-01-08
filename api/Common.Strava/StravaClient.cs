namespace Lambda.Strava;

public class StravaClient : HttpClient
{
    private readonly ILambdaLogger _logger;
    private readonly StravaConfiguration _config;

    public StravaClient(IConfiguration config, ILambdaLogger logger)
    {
        logger.LogInformation(JsonSerializer.Serialize(config));
        _config = config
            .GetSection(StravaConfiguration.Name)
            .Get<StravaConfiguration>();

        _logger = logger;

        BaseAddress = new Uri("https://www.strava.com/api/v3/");

        DefaultRequestHeaders
            .Accept
            .Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }

    public async Task<AccessTokenResponse> GetAccessToken(string code)
    {
        var request = new HttpRequestMessage(HttpMethod.Post, "oauth/token")
        {
            Content = new FormUrlEncodedContent(
            new Dictionary<string, string>
            {
                { "client_id", _config.ClientId},
                { "client_secret", _config.ClientSecret},
                { "code", code },
                { "grant_type", "authorization_code"}
            }
        )
        };

        var response = await SendAsync(request);
        _logger.LogInformation($"Sending request towards '{request.RequestUri}'");
        var result = await response.Content.ReadAsStringAsync();
            
        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError($"ERROR RESPONSE: {result}");
            throw new ArgumentException("unexpected result");
        }

        return JsonSerializer.Deserialize<AccessTokenResponse>(result)!;
    }
}