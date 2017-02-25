using Triven.Domain.Results;
using Triven.Domain.ViewModels.Email;

namespace Triven.Domain.Services
{
    public interface ISubscriptionService<out TResult> where TResult : IServiceResult
    {
        TResult Subscribe(EmailSubscribeViewModel email);
    }
}