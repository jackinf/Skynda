using System;
using Triven.Data.EntityFramework.Entities;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Email;

namespace Triven.Application.Services
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly ISubscriptionRepository<Subscription> _subscriptionRepository;

        public SubscriptionService()
        {
            _subscriptionRepository = IoC.Get<ISubscriptionRepository<Subscription>>();
        }

        public ServiceResult<object> Subscribe(EmailSubscribeViewModel email)
        {
            throw new NotImplementedException("What is this method for?");    // TODO: implement or remove.
        }
    }
}