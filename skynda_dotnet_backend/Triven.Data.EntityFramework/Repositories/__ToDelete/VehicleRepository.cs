using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Models.Vehicle;
using Triven.Domain.Repositories.Vehicle;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleRepository : BaseCrudRepository<IVehicleModel>, IVehicleRepository
    {
    }
}
