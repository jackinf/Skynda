using System;
using X3Project.Domain.Models.Base;
using X3Project.Domain.Results;

namespace X3Project.Domain.Repositories.Base
{
    public interface IUpdate<TAggregate> where TAggregate : IBaseModel
    {
        IResult<TAggregate> Update(int id, TAggregate model);
    }
}