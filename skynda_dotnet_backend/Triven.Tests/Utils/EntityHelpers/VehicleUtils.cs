using System;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Enums;

namespace Triven.FunctionalTests.Utils.EntityHelpers
{
    internal static class VehicleUtils
    {
        public static Vehicle CreateWithVehicleModelAndImage()
        {
            var vehicleModel1 = VehicleModelUtils.Create();
            var image1 = ImageUtils.Create();
            return Create(vehicleModel1.Id, image1.Id);
        }

        public static Vehicle Create(int vehicleModelId, int mainImageId)
        {
            using (var context = EntityFrameworkTestHelper.CreateContext())
            {
                var random = new Random();
                var newVehicle = context.Vehicles.Add(new Vehicle
                {
                    VinCode = Guid.NewGuid().ToString(),
                    Price = random.Next(1000, 10000),
                    RegistrationNumber = Guid.NewGuid().ToString(),
                    Mileage = random.Next(1000, 100000),
                    ColorOutsideHex = Guid.NewGuid().ToString(),
                    ColorInsideHex = Guid.NewGuid().ToString(),
                    FuelCity = random.Next(10, 100),
                    FuelHighway = random.Next(10, 100),
                    CompressionRatio = random.Next(1, 10),
                    CompressionType = Guid.NewGuid().ToString(),
                    Configuration = Guid.NewGuid().ToString(),
                    Cylinders = Guid.NewGuid().ToString(),
                    Displacement = Guid.NewGuid().ToString(),
                    Size = random.Next(1, 10),
                    Torque = random.Next(1, 10),
                    TotalValves = random.Next(1, 10),
                    Safetystars = random.Next(1, 10),
                    SafetyUrl = Guid.NewGuid().ToString(),
                    Additional = Guid.NewGuid().ToString(),
                    VehicleStatus = VehicleStatus.Published,

                    MainImageId = mainImageId,
                    VehicleModelId = vehicleModelId
                });
                context.SaveChanges();
                return newVehicle;
            }
        }
    }
}