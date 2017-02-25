using X3Project.Domain.Models.Base;
using X3Project.Domain.Results;

namespace X3Project.Domain.Repositories.Base
{
    public interface ICreate<TAggregate> where TAggregate : IBaseModel
    {
        IResult<TAggregate> Add(TAggregate model);
    }
}