using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.Repositories
{
    public interface IVehicleReportRepository<TVehicleReport> : IBaseCrudRepository<TVehicleReport>
        where TVehicleReport : IVehicleReport
    {
        void DeleteEntity(TVehicleReport report, DeleteResponseViewModel response);
        TVehicleReport Get(int id, bool isActive = true);
        List<TVehicleReport> GetAll(bool isActive = true);
        IList<TVehicleReport> GetAllBy(int vehicleId);
        IList<TVehicleReport> GetAllBy(int vehicleId, bool isActive);
    }
}