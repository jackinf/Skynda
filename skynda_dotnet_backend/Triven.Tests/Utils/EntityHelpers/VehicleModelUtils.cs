using System;
using Triven.Data.EntityFramework.Entities;
using Triven.Domain.Constants;

namespace Triven.FunctionalTests.Utils.EntityHelpers
{
    internal static class VehicleModelUtils
    {
        public static VehicleModel Create()
        {
            var vehicleManufacturer = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.ManufacturerTypeId);
            var transmission = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.TransmissionTypeId);
            var drivetrain = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.DrivetrainTypeId);
            var vehicleBody = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.VehicleBodyTypeId);
            var fuelType = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.FuelTypeId);
            return Create(vehicleManufacturer.Id, transmission.Id, drivetrain.Id, vehicleBody.Id, fuelType.Id);
        }

        public static VehicleModel Create(
            int vehicleManufacturerId,
            int transmissionId,
            int drivetrainId,
            int vehicleBodyId,
            int fuelTypeId,
            string modelCode = null,
            string description = null,
            string title = null,
            string engine = null,
            int? horsePower = null,
            int? doors = null,
            int? seats = null,
            int? year = null)
        {
            using (var context = EntityFrameworkTestHelper.CreateContext())
            {
                var random = new Random();
                var newVehicleModel = context.VehicleModels.Add(new VehicleModel
                {
                    Description = description ?? Guid.NewGuid().ToString(),
                    Doors = doors ?? random.Next(2, 5),
                    Seats = seats ?? random.Next(2, 10),
                    ModelCode = modelCode ?? Guid.NewGuid().ToString(),
                    VehicleManufacturerId = vehicleManufacturerId,
                    DrivetrainId = drivetrainId,
                    VehicleBodyId = vehicleBodyId,
                });
                context.SaveChanges();
                return newVehicleModel;
            }
        }
    }
}