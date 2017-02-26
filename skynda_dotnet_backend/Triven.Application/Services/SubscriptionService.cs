using System;
using Triven.Application.Results;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Email;

namespace Triven.Application.Services
{
    public class SubscriptionService : ISubscriptionService<ServiceResult>
    {
        private readonly ISubscriptionRepository<Subscription> _subscriptionRepository;

        public SubscriptionService()
        {
            _subscriptionRepository = IoC.Get<ISubscriptionRepository<Subscription>>();
        }

        public ServiceResult Subscribe(EmailSubscribeViewModel email)
        {
            throw new NotImplementedException("What is this method for?");    // TODO: implement or remove.
        }
    }
}