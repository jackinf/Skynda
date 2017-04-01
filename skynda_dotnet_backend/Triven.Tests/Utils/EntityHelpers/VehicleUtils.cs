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

        public static Vehicle Create(
            int vehicleModelId, 
            int mainImageId,
            string vinCode = null,
            int? price = null,
            string registrationNumber = null,
            int? mileage = null,
            string colorOutsideHex = null,
            string colorInsideHex = null,
            int? fuelCity = null,
            int? fuelHighway = null,
            int? compressionRatio = null,
            string compressionType = null,
            string configuration = null,
            string cylinders = null,
            string displacement = null,
            int? size = null,
            int? torque = null,
            int? totalValves = null,
            int? safetystars = null,
            string safetyUrl = null,
            string additional = null,
            VehicleStatus? vehicleStatus = null
            )
        {
            using (var context = EntityFrameworkTestHelper.CreateContext())
            {
                var random = new Random();
                var newVehicle = context.Vehicles.Add(new Vehicle
                {
                    VinCode = vinCode ?? Guid.NewGuid().ToString(),
                    Price = price ?? random.Next(1000, 10000),
                    RegistrationNumber = registrationNumber ?? Guid.NewGuid().ToString(),
                    Mileage = mileage ?? random.Next(1000, 100000),
                    ColorOutsideHex = colorOutsideHex ?? Guid.NewGuid().ToString(),
                    ColorInsideHex = colorInsideHex ?? Guid.NewGuid().ToString(),
                    FuelCity = fuelCity ?? random.Next(10, 100),
                    FuelHighway = fuelHighway ?? random.Next(10, 100),
                    CompressionRatio = compressionRatio ?? random.Next(1, 10),
                    CompressionType = compressionType ?? Guid.NewGuid().ToString(),
                    Configuration = configuration ?? Guid.NewGuid().ToString(),
                    Cylinders = cylinders ?? Guid.NewGuid().ToString(),
                    Displacement = displacement ?? Guid.NewGuid().ToString(),
                    Size = size ?? random.Next(1, 10),
                    Torque = torque ?? random.Next(1, 10),
                    TotalValves = totalValves ?? random.Next(1, 10),
                    Safetystars = safetystars ?? random.Next(1, 10),
                    SafetyUrl = safetyUrl ?? Guid.NewGuid().ToString(),
                    Additional = additional ?? Guid.NewGuid().ToString(),
                    VehicleStatus = vehicleStatus ?? VehicleStatus.Published,

                    MainImageId = mainImageId,
                    VehicleModelId = vehicleModelId
                });
                context.SaveChanges();
                return newVehicle;
            }
        }
    }
}