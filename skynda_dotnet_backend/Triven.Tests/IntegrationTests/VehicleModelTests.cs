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

            var requestParams = new VehicleModelViewModel();
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

            var vehicleManufacturer = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.ManufacturerTypeId);
            var transmission = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.TransmissionTypeId);
            var drivetrain = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.DrivetrainTypeId);
            var vehicleBody = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.VehicleBodyTypeId);
            var fuelType = ClassificationUtils.GetRandomByType(DatabaseConstants.ClassificationTypeId.FuelTypeId);

            var vehicleModel1 = VehicleModelUtils.Create();
            var image1 = ImageUtils.Create();
            var vehicle1 = VehicleUtils.Create(vehicleModel1.Id, image1.Id);

            //
            // ACT
            //

            var controller = NewController();
            var result = controller.Update(vehicle1.Id, new VehicleModelViewModel()).GetOkPayload<VehicleModelViewModel>();

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

            // TODO: Assert
        }

    }
}