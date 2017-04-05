using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Data.EntityFramework.Entities;
using Triven.Domain.ViewModels.Vehicle;
using Triven.FunctionalTests.Utils;
using Triven.FunctionalTests.Utils.EntityHelpers;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class VehicleReportTests : TestsBase
    {
        [DebuggerStepThrough]
        private VehicleReportController NewController() => new VehicleReportController();

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
            var report1 = VehicleReportUtils.Create(vehicle1.Id);
            var report2 = VehicleReportUtils.Create(vehicle2.Id);

            //
            // ACT
            //

            var results = NewController().GetAll().GetOkPayload<IEnumerable<VehicleReportViewModel>>().ToList();

            //
            // ASSERT
            //

            Assert.AreEqual(2, results.Count);

            var firstReport = results.Single(x => x.Id == report1.Id);
            var secondReport = results.Single(x => x.Id == report2.Id);
            // TODO: assert
        }

        [Test]
        public void should_get_all_by_vehicle()
        {
            //
            // ARRANGE
            //

            var vehicleModel1 = VehicleModelUtils.Create();
            var image1 = ImageUtils.Create();
            var vehicle1 = VehicleUtils.Create(vehicleModel1.Id, image1.Id);
            var vehicle2 = VehicleUtils.Create(vehicleModel1.Id, image1.Id);
            var report1 = VehicleReportUtils.Create(vehicle1.Id);
            var report2 = VehicleReportUtils.Create(vehicle1.Id);
            var report3 = VehicleReportUtils.Create(vehicle2.Id);

            //
            // ACT
            //

            var results = NewController().GetAllByVehicle(vehicle1.Id).GetOkPayload<IList<VehicleReportViewModel>>();

            //
            // ASSERT
            //

            Assert.AreEqual(2, results.Count);

            var firstReport = results.Single(x => x.Id == report1.Id);
            var secondReport = results.Single(x => x.Id == report2.Id);
            Assert.IsNull(results.SingleOrDefault(x => x.Id == report3.Id));
            // TODO: assert
        }

        [Test]
        public void should_get()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();
            var report1 = VehicleReportUtils.Create(vehicle1.Id);

            //
            // ACT
            //

            var result = NewController().Get(report1.Id).GetOkPayload<VehicleReportViewModel>();

            //
            // ASSERT
            //

            Assert.AreEqual(report1.Id, result.Id);
            // TODO: assert better
        }

        [Test]
        public void should_add()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();

            //
            // ACT
            //

            var controller = NewController();
            var requestViewModel = new VehicleReportViewModel
            {
                Title = $"created_{Guid.NewGuid()}",
                Description = $"created_{Guid.NewGuid()}",
                Inspector = $"created_{Guid.NewGuid()}"
                // TODO: faults and items
            };
            var result = controller.Add(vehicle1.Id, requestViewModel).GetOkPayload<VehicleReportViewModel>();

            //
            // ASSERT
            //

            var fromDb = GetFromDbStrict<VehicleReport>(result.Id);
            // TODO: assert
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
            var vehicle2 = VehicleUtils.Create(vehicleModel1.Id, image1.Id);
            var report1 = VehicleReportUtils.Create(
                vehicleId: vehicle1.Id, 
                title: $"created_{Guid.NewGuid()}",
                description: $"created_{Guid.NewGuid()}",
                inspector: $"created_{Guid.NewGuid()}");

            //
            // ACT
            //

            var controller = NewController();
            var requestViewModel = new VehicleReportViewModel
            {
                Id = report1.Id,
                Title = $"updated_{Guid.NewGuid()}",
                Description = $"updated_{Guid.NewGuid()}",
                Inspector = $"updated_{Guid.NewGuid()}"
                // TODO: faults and items
            };
            var result = controller.Update(vehicle1.Id, report1.Id, requestViewModel).GetOkPayload<VehicleReportViewModel>();

            //
            // ASSERT
            //

            Assert.AreEqual(report1.Id, result.Id);
        }

        [Test]
        public void should_delete()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();
            var report1 = VehicleReportUtils.Create(vehicle1.Id);

            //
            // ACT
            //

            var isSuccess = NewController().Delete(report1.Id).GetOkPayload<bool>();

            //
            // ASSERT
            //

            Assert.IsTrue(isSuccess);
            var fromDb = GetFromDb<VehicleReport>(report1.Id);
            Assert.IsTrue(fromDb.DeletedOn.HasValue);
        }
    }
}