namespace Lambda.Functions.AccessToken.Models.Request;

public class AccessTokenRequest
{
    [JsonPropertyName("code")]
    public string Code { get; set; }
}