namespace Strava.Infrastructure.Helpers
{
    using System.Net.Http.Headers;
    using System.Text.Json;
    using System.Text.Json.Serialization;
    using Microsoft.Extensions.Logging;
    using Services.Strava.Helpers;
    using HttpHeaders = Services.Strava.Constants.HttpHeaders;

    public abstract class StravaClient: HttpClient
    {
        protected readonly ILogger Logger;

        protected StravaClient(ILogger logger)
        {
            Logger = logger;

            DefaultRequestHeaders
                .Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }


        protected async Task<StravaResponse<T>> SendDataRequestAsync<T>(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var response = await SendAsync(request, cancellationToken);
            Logger.LogInformation("Sending request towards '{RequestUri}'", request.RequestUri);
            var result = await response.Content.ReadAsStringAsync(cancellationToken);

            if (response.IsSuccessStatusCode)
            {
                // rate limit
                var limit = response.Headers.GetValues(HttpHeaders.RateLimit.Limit).First();
                var usage = response.Headers.GetValues(HttpHeaders.RateLimit.Usage).First();
                var fifteenMinuteRateLimit = new RateLimit(int.Parse(limit.Split(',')[0]), int.Parse(usage.Split(',')[0]));
                var dailyRateLimit = new RateLimit(int.Parse(limit.Split(',')[1]), int.Parse(usage.Split(',')[1]));

                Logger.LogInformation($"Rate Limit - 15m ({fifteenMinuteRateLimit.Percentage:##.###}%); Daily ({dailyRateLimit.Percentage:##.###}%)");

                try
                {
                    //TODO GLOBAL CONVERTER
                    var value = JsonSerializer.Deserialize<T>(result, new JsonSerializerOptions { Converters = { new JsonStringEnumConverter() } })!;
                    return new StravaResponse<T>(value, fifteenMinuteRateLimit, dailyRateLimit);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
             
            }

            Logger.LogError("ERROR RESPONSE: {result}", result);
            throw new ArgumentException("unexpected result");
        }


        protected async Task<T> SendRequestAsync<T>(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var response = await SendAsync(request, cancellationToken);
            Logger.LogInformation("Sending request towards '{RequestUri}'", request.RequestUri);
            var result = await response.Content.ReadAsStringAsync(cancellationToken);

            if (response.IsSuccessStatusCode)
            {
                //TODO GLOBAL CONVERTER
                return JsonSerializer.Deserialize<T>(result, new JsonSerializerOptions { Converters = { new JsonStringEnumConverter() } })!;
            }

            Logger.LogError("ERROR RESPONSE: {result}", result);
            throw new ArgumentException("unexpected result");
        }
    }
}
