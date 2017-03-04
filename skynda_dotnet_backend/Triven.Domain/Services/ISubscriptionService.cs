using Triven.Domain.Results;
using Triven.Domain.ViewModels.Email;

namespace Triven.Domain.Services
{
    public interface ISubscriptionService
    {
        ServiceResult<object> Subscribe(EmailSubscribeViewModel email);
    }
}