using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Enums;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Domain.ViewModels.Vehicle.Requests;
using Triven.FunctionalTests.Utils;
using Triven.FunctionalTests.Utils.EntityHelpers;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class VehicleTests : TestsBase
    {
        [DebuggerStepThrough]
        VehicleController NewController() => new VehicleController();

        [SetUp]
        public void SetUp() => ClearAllTablesAndApply();

        [Test]
        public void should_get_all()
        {
            //
            // ARRANGE
            //

            var vehicleModel1 = VehicleModelUtils.Create();
            var image1 = ImageUtils.Create();
            var vehicle1 = VehicleUtils.Create(vehicleModel1.Id, image1.Id);
            var vehicle2 = VehicleUtils.Create(vehicleModel1.Id, image1.Id);


            //
            // ACT
            //

            var results = NewController()
                .GetAll(new SearchRequestViewModel())
                .GetOkPayload<IEnumerable<VehicleModelViewModel>>().ToList();

            //
            // ASSERT
            //

            Assert.AreEqual(2, results.Count);

            var firstItem = results.Single(x => x.Id == vehicle1.Id);
            var secondItem = results.Single(x => x.Id == vehicle2.Id);

            // TODO: Assert
        }

        [Test]
        public void should_get()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();

            //
            // ACT
            //

            var result = NewController().Get(vehicle1.Id).GetOkPayload<VehicleReportViewModel>();

            //
            // ASSERT
            //

            Assert.AreEqual(vehicle1.Id, result.Id);

            // TODO: Assert
        }

        [Test]
        public void should_get_detailed()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();

            //
            // ACT
            //

            var result = NewController().GetDetailed(vehicle1.Id).GetOkPayload<VehicleReportViewModel>();

            //
            // ASSERT
            //

            Assert.AreEqual(vehicle1.Id, result.Id);

            // TODO: Assert
        }

        [Test]
        public void should_add()
        {
            //
            // ARRANGE
            //

            var vehicleModel1 = VehicleModelUtils.Create();
            var image1 = ImageUtils.Create();

            //
            // ACT
            //

            var requestParam = new VehicleAdminViewModel
            {
                
            };
            var result = NewController().Add(requestParam).GetOkPayload<VehicleReportViewModel>();

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

            var vehicleModel1 = VehicleModelUtils.Create();
            var image1 = ImageUtils.Create();
            var vehicle1 = VehicleUtils.Create(vehicleModel1.Id, image1.Id);

            //
            // ACT
            //

            var requestParam = new VehicleAdminViewModel();
            var result = NewController().Update(vehicle1.Id, requestParam).GetOkPayload<VehicleReportViewModel>();

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

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();

            //
            // ACT
            //

            var isSuccess = NewController().Delete(vehicle1.Id).GetOkPayload<bool>();

            //
            // ASSERT
            //

            Assert.IsTrue(isSuccess);
            var fromDb = GetFromDb<Vehicle>(vehicle1.Id);
            Assert.IsTrue(fromDb.DeletedOn.HasValue);

            // TODO: Assert
        }

        [Test]
        public void should_search()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();

            //
            // ACT
            //

            var requestParam = new SearchRequestViewModel();
            var isSuccess = NewController().Search(requestParam).GetOkPayload<bool>();

            //
            // ASSERT
            //

            Assert.IsTrue(isSuccess);
            var fromDb = GetFromDb<Vehicle>(vehicle1.Id);

            // TODO: Assert
        }

        [Test]
        public void should_publish()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();

            //
            // ACT
            //

            var isSuccess = NewController().Publish(vehicle1.Id).GetOkPayload<bool>();

            //
            // ASSERT
            //

            Assert.IsTrue(isSuccess);
            var fromDb = GetFromDb<Vehicle>(vehicle1.Id);
            Assert.AreEqual(fromDb.VehicleStatus, VehicleStatus.Published);
        }

        [Test]
        public void should_unpublish()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();

            //
            // ACT
            //

            var isSuccess = NewController().Unpublish(vehicle1.Id).GetOkPayload<bool>();

            //
            // ASSERT
            //

            Assert.IsTrue(isSuccess);
            var fromDb = GetFromDb<Vehicle>(vehicle1.Id);
            Assert.AreEqual(fromDb.VehicleStatus, VehicleStatus.Unpublished);
        }

    }
}