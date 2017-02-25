using Triven.Domain.Models.Base;

namespace Triven.Domain.Repositories.Base
{
    public interface IBaseCrudRepository<TAggregate> :
        IGet<TAggregate>,
        ICreate<TAggregate>,
        IUpdate<TAggregate>,
        IDelete
        where TAggregate : IBaseModel
    {
    }
}