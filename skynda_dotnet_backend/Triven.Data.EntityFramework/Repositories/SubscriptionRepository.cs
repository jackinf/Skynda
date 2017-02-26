﻿using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class SubscriptionRepository : BaseCrudRepository<Subscription>, ISubscriptionRepository<Subscription>
    {
        public Subscription GetByEmail(string email)
        {
            return BaseQuery().FirstOrDefault(x => x.Email == email);
        }
    }
}