using X3Project.Data.EntityFramework.Repositories.Base;
using X3Project.Domain.Models.Driver;
using X3Project.Domain.Repositories.Driver;

namespace X3Project.Data.EntityFramework.Repositories
{
    public class DriverRepository : BaseCrudRepository<IDriverModel>, IDriverRepository
    {
    }
}
