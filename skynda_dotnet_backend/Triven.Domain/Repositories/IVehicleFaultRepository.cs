using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.Repositories
{
    public interface IVehicleFaultRepository<TVehicleFaultEntity> : IBaseCrudRepository<TVehicleFaultEntity>
        where TVehicleFaultEntity : IVehicleFault
    {
        IList<TVehicleFaultEntity> GetCategoryFaults(int categoryId);
        void DeleteEntity(TVehicleFaultEntity fault, DeleteResponseViewModel response);
        TVehicleFaultEntity SaveOrUpdate(TVehicleFaultEntity vehicleFault);
        IList<TVehicleFaultEntity> GetActiveFaults(int reportCategoryId);
    }
}