using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Constants;
using Triven.Domain.ViewModels.Vehicle;
using Triven.FunctionalTests.Utils;
using Triven.FunctionalTests.Utils.EntityHelpers;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class VehicleModelTests : TestsBase
    {
        [DebuggerStepThrough]
        VehicleModelController NewController() => new VehicleModelController();

        [SetUp]
        public void SetUp() => ClearAllTablesAndApply();

        [Test]
        public void should_get_all()
        {
            //
            // ARRANGE
            //

            var vehicleModel1 = VehicleModelUtils.Create();
            var vehicleModel2 = VehicleModelUtils.Create();
            
            //
            // ACT
            //

            var results = NewController().GetAll().GetOkPayload<IEnumerable<VehicleModelViewModel>>().ToList();

            //
            // ASSERT
            //

            Assert.AreEqual(2, results.Count);

            var firstItem = results.Single(x => x.Id == vehicleModel1.Id);
            var secondItem = results.Single(x => x.Id == vehicleModel2.Id);

            // TODO: Assert
        }

        [Test]
        public void should_get()
        {
            //
            // ARRANGE
            //

            var vehicleModel1 = VehicleModelUtils.Create();

            //
            // ACT
            //

            var result = NewController().Get(vehicleModel1.Id).GetOkPayload<VehicleModelViewModel>();

            //
            // ASSERT
            //

            Assert.AreEqual(vehicleModel1.Id, result.Id);

            // TODO: Assert
        }

        [Test]
        public void should_add()
        {
            //
            // ARRANGE
            //

            var vehicleManufacturer = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.ManufacturerTypeId);
            var transmission = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.TransmissionTypeId);
            var drivetrain = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.DrivetrainTypeId);
            var vehicleBody = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.VehicleBodyTypeId);
            var fuelType = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.FuelTypeId);

            //
            // ACT
            //

            var requestParams = new VehicleModelViewModel
            {
                ModelCode = $"updated_{Guid.NewGuid()}",
                Description = $"updated_{Guid.NewGuid()}",
                Title = $"updated_{Guid.NewGuid()}",
                Engine = $"updated_{Guid.NewGuid()}",
                HorsePower = 100,
                Doors = 5,
                Seats = 5,
                Year = 2012,
                VehicleManufacturerId = vehicleManufacturer.Id,
                TransmissionId = transmission.Id,
                DrivetrainId = drivetrain.Id,
                VehicleBodyId = vehicleBody.Id,
                FuelTypeId = fuelType.Id
            };
            var result = NewController().Add(requestParams).GetOkPayload<VehicleModelViewModel>();

            //
            // ASSERT
            //

            var fromDb = GetFromDbStrict<VehicleReport>(result.Id);

            // TODO: Assert
        }

        [Test]
        public void should_update()
        {
            //
            // ARRANGE
            //

            var vehicleManufacturer = ClassificationUtils.GetByValue("BMW", DatabaseConstants.ClassificationTypeId.ManufacturerTypeId);
            var transmission = ClassificationUtils.GetByValue("MANUAL", DatabaseConstants.ClassificationTypeId.TransmissionTypeId);
            var drivetrain = ClassificationUtils.GetByValue("FRONT", DatabaseConstants.ClassificationTypeId.DrivetrainTypeId);
            var vehicleBody = ClassificationUtils.GetByValue("SEDAN", DatabaseConstants.ClassificationTypeId.VehicleBodyTypeId);
            var fuelType = ClassificationUtils.GetByValue("DIESEL", DatabaseConstants.ClassificationTypeId.FuelTypeId);

            var vehicleModel1 = VehicleModelUtils.Create(
                vehicleManufacturer.Id, 
                transmission.Id, 
                drivetrain.Id, 
                vehicleBody.Id, 
                fuelType.Id,
                modelCode: $"created_{Guid.NewGuid()}",
                description: $"created_{Guid.NewGuid()}",
                title: $"created_{Guid.NewGuid()}",
                engine: $"created_{Guid.NewGuid()}",
                horsePower: 200,
                doors: 4,
                seats: 3,
                year: 2011);

            //
            // ACT
            //

            var vehicleManufacturerForUpdate = ClassificationUtils.GetByValue("BUGATTI", DatabaseConstants.ClassificationTypeId.ManufacturerTypeId);
            var transmissionForUpdate = ClassificationUtils.GetByValue("AUTOMATIC", DatabaseConstants.ClassificationTypeId.TransmissionTypeId);
            var drivetrainForUpdate = ClassificationUtils.GetByValue("REAR", DatabaseConstants.ClassificationTypeId.DrivetrainTypeId);
            var vehicleBodyForUpdate = ClassificationUtils.GetByValue("HATCHBACK", DatabaseConstants.ClassificationTypeId.VehicleBodyTypeId);
            var fuelTypeForUpdate = ClassificationUtils.GetByValue("PETROL", DatabaseConstants.ClassificationTypeId.FuelTypeId);
            var requestParams = new VehicleModelViewModel
            {
                ModelCode = $"updated_{Guid.NewGuid()}",
                Description = $"updated_{Guid.NewGuid()}",
                Title = $"updated_{Guid.NewGuid()}",
                Engine = $"updated_{Guid.NewGuid()}",
                HorsePower = 100,
                Doors = 5,
                Seats = 5,
                Year = 2012,
                VehicleManufacturerId = vehicleManufacturerForUpdate.Id,
                TransmissionId = transmissionForUpdate.Id,
                DrivetrainId = drivetrainForUpdate.Id,
                VehicleBodyId = vehicleBodyForUpdate.Id,
                FuelTypeId = fuelTypeForUpdate.Id
            };
            var result = NewController().Update(vehicleModel1.Id, requestParams).GetOkPayload<VehicleModelViewModel>();

            //
            // ASSERT
            //

            // TODO: Assert
        }

        [Test]
        public void should_delete()
        {
            //
            // ARRANGE
            //

            var vehicleModel1 = VehicleModelUtils.Create();

            //
            // ACT
            //

            var isSuccess = NewController().Delete(vehicleModel1.Id).GetOkPayload<bool>();

            //
            // ASSERT
            //

            Assert.IsTrue(isSuccess);
            var fromDb = GetFromDb<Vehicle>(vehicleModel1.Id);
            Assert.IsTrue(fromDb.DeletedOn.HasValue);
            Assert.IsTrue(fromDb.IsArchived);

            // TODO: Assert
        }

    }
}