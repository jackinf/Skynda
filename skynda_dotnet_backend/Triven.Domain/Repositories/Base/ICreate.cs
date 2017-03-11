using Triven.Domain.Models.Base;
using Triven.Domain.Results;
using Triven.Domain.UnitOfWorks;

namespace Triven.Domain.Repositories.Base
{
    public interface ICreate<TAggregate> where TAggregate : IBaseModel
    {
        IResult<TAggregate> Add(TAggregate model, IDbContext context = null);
    }
}