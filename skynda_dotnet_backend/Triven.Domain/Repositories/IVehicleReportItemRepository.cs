using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories
{
    public interface IVehicleReportItemRepository<TVehicleReportItemEntity> : IBaseCrudRepository<TVehicleReportItemEntity>
        where TVehicleReportItemEntity : IVehicleReportItem
    {
        IList<TVehicleReportItemEntity> GetAllChildren(int parentId);
    }
}