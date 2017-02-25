using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories
{
    public interface ISubscriptionRepository<TSubscriptionEntity> : IBaseCrudRepository<TSubscriptionEntity>
        where TSubscriptionEntity : ISubscription
    {
        TSubscriptionEntity GetByEmail(string email);
    }
}