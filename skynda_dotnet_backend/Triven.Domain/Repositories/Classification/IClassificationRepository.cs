using Triven.Domain.Models.Classification;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories.Classification
{
    public interface IClassificationRepository : IBaseCrudRepository<IClassificationModel>
    {
        IClassificationModel FindByName(string name);
    }
}
