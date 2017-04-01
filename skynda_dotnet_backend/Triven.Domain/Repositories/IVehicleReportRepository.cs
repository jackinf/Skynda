using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.Results;

namespace Triven.Domain.Repositories
{
    public interface IVehicleReportRepository<TVehicleReport> : IBaseCrudRepository<TVehicleReport>
        where TVehicleReport : IVehicleReport
    {
        IList<TVehicleReport> GetAllBy(int vehicleId);
        IResult<TVehicleReport> Add(int vehicleId, TVehicleReport context);
        IResult<TVehicleReport> Update(int vehicleId, int id, TVehicleReport entity);

        TVehicleReport GetFull(int id);
    }
}