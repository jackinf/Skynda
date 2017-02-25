using System.Collections.Generic;
using Triven.Domain.Models.Base;

namespace Triven.Domain.Repositories.Base
{
    public interface IGet<out TAggregate> where TAggregate : IBaseModel
    {
        IEnumerable<TAggregate> GetAll();
        TAggregate Get(int id);
    }
}