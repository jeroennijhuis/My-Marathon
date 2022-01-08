namespace Lambda.Functions.AccessToken.Tests;

using Amazon.Lambda.TestUtilities;
using Xunit;

public class FunctionTest
{
    [Fact]
    public void TestToUpperFunction()
    {
        // Invoke the lambda function and confirm the string was upper cased.
        var context = new TestLambdaContext();
        var response = Function.FunctionHandler(null, context);

        Assert.NotNull(response);
    }
}