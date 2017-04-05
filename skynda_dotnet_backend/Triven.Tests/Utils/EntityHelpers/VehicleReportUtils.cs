using System;
using Triven.Data.EntityFramework.Entities;

namespace Triven.FunctionalTests.Utils.EntityHelpers
{
    internal static class VehicleReportUtils
    {
        public static VehicleReport Create(
            int vehicleId,
            string title = null,
            string description = null,
            string inspector = null)
        {
            using (var context = EntityFrameworkTestHelper.CreateContext())
            {
                var newVehicleReport = context.VehicleReports.Add(new VehicleReport
                {
                    Title = title ?? Guid.NewGuid().ToString(),
                    Description = description ?? Guid.NewGuid().ToString(),
                    Inspector = inspector ?? Guid.NewGuid().ToString(),
                    VehicleId = vehicleId
                });
                context.SaveChanges();
                return newVehicleReport;
            }
        }
    }
}