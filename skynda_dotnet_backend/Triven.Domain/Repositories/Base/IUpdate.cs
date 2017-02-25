using Triven.Domain.Models.Base;
using Triven.Domain.Results;

namespace Triven.Domain.Repositories.Base
{
    public interface IUpdate<TAggregate> where TAggregate : IBaseModel
    {
        IResult<TAggregate> Update(int id, TAggregate model);
    }
}