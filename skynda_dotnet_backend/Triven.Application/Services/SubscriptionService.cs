using Triven.Application.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Email;

namespace Triven.Application.Services
{
    public class SubscriptionService : ISubscriptionService<ServiceResult>
    {
        public ServiceResult Subscribe(EmailSubscribeViewModel email)
        {
            throw new System.NotImplementedException();
        }
    }
}