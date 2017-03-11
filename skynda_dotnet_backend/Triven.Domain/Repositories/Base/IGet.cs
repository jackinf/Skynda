using System.Collections.Generic;
using Triven.Domain.Models.Base;
using Triven.Domain.UnitOfWorks;

namespace Triven.Domain.Repositories.Base
{
    public interface IGet<out TAggregate> where TAggregate : IBaseModel
    {
        IEnumerable<TAggregate> GetAll(IDbContext context = null);
        TAggregate Get(int id, IDbContext context = null);
    }
}