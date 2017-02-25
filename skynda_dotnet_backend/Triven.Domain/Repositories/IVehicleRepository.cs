using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Domain.Repositories
{
    public interface IVehicleRepository<TVehicleEntity> : IBaseCrudRepository<TVehicleEntity>
        where TVehicleEntity : IVehicle
    {
        IList<TVehicleEntity> Search(SearchRequestViewModel dto);
        TVehicleEntity Get(int id, bool isActive = true);
        void DeleteEntity(TVehicleEntity vehicleDescription, DeleteResponseViewModel response);
        TVehicleEntity SaveOrUpdate(TVehicleEntity vehicle);
    }
}