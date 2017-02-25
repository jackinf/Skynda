using System;
using System.Collections.Generic;
using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Repositories.Base
{
    public interface IGet<out TAggregate> where TAggregate : IBaseModel
    {
        IEnumerable<TAggregate> GetAll();
        TAggregate Get(int id);
    }
}