using Triven.Domain.Models.Base;
using Triven.Domain.Results;
using Triven.Domain.UnitOfWorks;

namespace Triven.Domain.Repositories.Base
{
    public interface IUpdate<TAggregate> where TAggregate : IBaseModel
    {
        IResult<TAggregate> Update(int id, TAggregate model, IDbContext context = null);
    }
}