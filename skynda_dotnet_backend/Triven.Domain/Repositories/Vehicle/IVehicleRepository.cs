using Triven.Domain.Models.Vehicle;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories.Vehicle
{
    public interface IVehicleRepository: IBaseCrudRepository<IVehicleModel>
    {
    }
}
