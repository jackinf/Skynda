using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.Repositories
{
    public interface IVehicleReportItemRepository<TVehicleReportItemEntity> : IBaseCrudRepository<TVehicleReportItemEntity>
        where TVehicleReportItemEntity : IVehicleReportItem
    {
        TVehicleReportItemEntity SaveOrUpdate(TVehicleReportItemEntity vehicleReportItem);
        void SaveOrUpdate(ICollection<TVehicleReportItemEntity> items);
        void DeleteEntity(TVehicleReportItemEntity vehicleReportItem, DeleteResponseViewModel response);
        IList<TVehicleReportItemEntity> GetAllChildren(int parentId);
        IList<TVehicleReportItemEntity> GetActiveItems(int parentId);
    }
}