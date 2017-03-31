using System;
using Triven.Data.EntityFramework.Models;
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
            int fuelTypeId)
        {
            using (var context = EntityFrameworkTestHelper.CreateContext())
            {
                var random = new Random();
                var newVehicleModel = context.VehicleModels.Add(new VehicleModel
                {
                    Description = Guid.NewGuid().ToString(),
                    Title = Guid.NewGuid().ToString(),
                    HorsePower = random.Next(200, 500),
                    Doors = random.Next(2, 5),
                    Seats = random.Next(2, 10),
                    ModelCode = Guid.NewGuid().ToString(),
                    Engine = Guid.NewGuid().ToString(),
                    Year = random.Next(DateTime.Now.Year - 15, DateTime.Now.Year),

                    VehicleManufacturerId = vehicleManufacturerId,
                    TransmissionId = transmissionId,
                    DrivetrainId = drivetrainId,
                    VehicleBodyId = vehicleBodyId,
                    FuelTypeId = fuelTypeId
                });
                context.SaveChanges();
                return newVehicleModel;
            }
        }
    }
}