using Triven.Domain.UnitOfWorks;

namespace Triven.Domain.Repositories.Base
{
    public interface IDelete
    {
        bool Delete(int id, IDbContext context = null);
    }
}