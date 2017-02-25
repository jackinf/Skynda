using Triven.Domain.Models.Base;
using Triven.Domain.Results;

namespace Triven.Domain.Repositories.Base
{
    public interface ICreate<TAggregate> where TAggregate : IBaseModel
    {
        IResult<TAggregate> Add(TAggregate model);
    }
}