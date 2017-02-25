using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Repositories.Base
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