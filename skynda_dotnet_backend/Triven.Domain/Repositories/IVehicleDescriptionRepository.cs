using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.Repositories
{
    public interface IVehicleDescriptionRepository<TVehicleDescriptionEntity> : IBaseCrudRepository<TVehicleDescriptionEntity>
        where TVehicleDescriptionEntity : IVehicleDescription
    {
        IList<TVehicleDescriptionEntity> GetAllVehicleDescriptions(int id);
        void DeleteEntity(TVehicleDescriptionEntity vehicleDescription, DeleteResponseViewModel response);
        TVehicleDescriptionEntity SaveOrUpdate(TVehicleDescriptionEntity vehicleReportItem);
        void SaveOrUpdate(ICollection<TVehicleDescriptionEntity> items);
    }
}