using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Domain.Repositories
{
    public interface IVehicleRepository<TVehicleEntity> : IBaseCrudRepository<TVehicleEntity>
        where TVehicleEntity : IVehicle
    {
        TVehicleEntity GetIncluding(int id, bool descriptions = false, bool images = false);
        IList<TVehicleEntity> Search(SearchRequestViewModel dto);

        TVehicleEntity GetDetailed(int id);
    }
}