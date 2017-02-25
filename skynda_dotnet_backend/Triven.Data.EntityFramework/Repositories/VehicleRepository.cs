using X3Project.Data.EntityFramework.Repositories.Base;
using X3Project.Domain.Models.Vehicle;
using X3Project.Domain.Repositories.Vehicle;

namespace X3Project.Data.EntityFramework.Repositories
{
    public class VehicleRepository : BaseCrudRepository<IVehicleModel>, IVehicleRepository
    {
    }
}
