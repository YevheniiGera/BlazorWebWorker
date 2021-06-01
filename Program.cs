using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;

namespace BlazorWebWorker
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = WebAssemblyHostBuilder.CreateDefault(args).Build();

            var jsService = (IJSRuntime)host.Services.GetService(typeof(IJSRuntime));

            var foo = await jsService.InvokeAsync<string>("service.foo");

            Console.WriteLine("This code is executed in worker");
            Console.WriteLine(foo);
        }
    }
}
