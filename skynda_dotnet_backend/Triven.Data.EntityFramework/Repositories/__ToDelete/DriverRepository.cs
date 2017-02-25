using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Models.Driver;
using Triven.Domain.Repositories.Driver;

namespace Triven.Data.EntityFramework.Repositories
{
    public class DriverRepository : BaseCrudRepository<IDriverModel>, IDriverRepository
    {
    }
}
