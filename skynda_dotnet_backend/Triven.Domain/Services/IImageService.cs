using Triven.Domain.Results;

namespace Triven.Domain.Services
{
    public interface IImageService<out TResult> where TResult : IServiceResult
    {
        TResult List(string containerName);
    }
}