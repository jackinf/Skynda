using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Results;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle;
using Triven.Tests.Utils;

namespace Triven.Tests.IntegrationTests
{
    public class VehicleReportIntegrationTests : IntegrationTestBase
    {
        private VehicleReportController NewController() => new VehicleReportController();

        [SetUp]
        public void SetUp() => ClearAllTablesAndApply();

        [Test]
        public void should_get_all()
        {
            //
            // ARRANGE
            //

            ClearTable(Context.VehicleReports);
            var vehicle = Context.Vehicles.Add(new Vehicle());
            Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle});
            Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle});
            Context.SaveChanges();

            //
            // ACT
            //

            var controller = NewController();
            var okNegotiatedContentResult = controller.GetAll() as OkNegotiatedContentResult<ServiceResult<IEnumerable<VehicleReportViewModel>>>;
            Assert.IsNotNull(okNegotiatedContentResult, "Response was not ok");
            var results = okNegotiatedContentResult.Content.Payload;

            //
            // ASSERT
            //

            Assert.AreEqual(2, results.Count());
        }

        [Test]
        public void should_get_all_by_vehicle()
        {
            //
            // ARRANGE
            //

            ClearTable(Context.VehicleReports);
            var vehicle1 = Context.Vehicles.Add(new Vehicle());
            var vehicle2 = Context.Vehicles.Add(new Vehicle());
            Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle1});
            Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle2});
            Context.SaveChanges();

            //
            // ACT
            //

            var controller = NewController();
            var okNegotiatedContentResult = controller.GetAllByVehicle(vehicle1.Id) as OkNegotiatedContentResult<ServiceResult<IList<VehicleReportViewModel>>>;
            Assert.IsNotNull(okNegotiatedContentResult, "Response was not ok");
            var results = okNegotiatedContentResult.Content.Payload;

            //
            // ASSERT
            //

            Assert.AreEqual(1, results.Count());
        }

        [Test]
        public void should_get()
        {
            //
            // ARRANGE
            //

            ClearTable(Context.VehicleReports);
            var vehicle = Context.Vehicles.Add(new Vehicle());
            var review = Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle});
            Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle});
            Context.SaveChanges();

            //
            // ACT
            //

            var controller = NewController();
            var okNegotiatedContentResult = controller.Get(review.Id) as OkNegotiatedContentResult<ServiceResult<VehicleReportViewModel>>;
            Assert.IsNotNull(okNegotiatedContentResult, "Response was not ok");
            var result = okNegotiatedContentResult.Content.Payload;

            //
            // ASSERT
            //

            Assert.AreEqual(review.Id, result.Id);
        }

        [Test]
        public void should_add()
        {
            //
            // ARRANGE
            //

            ClearTable(Context.Vehicles);
            ClearTable(Context.VehicleReports);
            var vehicle = Context.Vehicles.Add(new Vehicle());
            Context.SaveChanges();

            //
            // ACT
            //

            var controller = NewController();
            var requestViewModel = new VehicleReportViewModel
            {
                Description = "test123"
            };
            var okNegotiatedContentResult = controller.Add(vehicle.Id, requestViewModel) as OkNegotiatedContentResult<ServiceResult<VehicleReportViewModel>>;
            Assert.IsNotNull(okNegotiatedContentResult, "Response was not ok");
            var result = okNegotiatedContentResult.Content.Payload;

            //
            // ASSERT
            //

            var VehicleReport = Context.VehicleReports.Single();
            Assert.AreEqual(VehicleReport.Id, result.Id);
        }

        [Test]
        public void should_update()
        {
            //
            // ARRANGE
            //

            ClearTable(Context.VehicleReports);
            var report = Context.VehicleReports.Add(new VehicleReport { Description = "test123" });
            var vehicle = Context.Vehicles.Add(new Vehicle());
            Context.SaveChanges();

            //
            // ACT
            //

            var controller = NewController();
            var requestViewModel = new VehicleReportViewModel { Description = "test123_updated" };
            var okNegotiatedContentResult = controller.Update(vehicle.Id, report.Id, requestViewModel) as OkNegotiatedContentResult<ServiceResult<VehicleReportViewModel>>;
            Assert.IsNotNull(okNegotiatedContentResult, "Response was not ok");
            var result = okNegotiatedContentResult.Content.Payload;

            //
            // ASSERT
            //

            Assert.AreEqual(report.Id, result.Id);
            Assert.AreEqual("test123_updated", result.Description);
        }

        [Test]
        public void should_delete()
        {
            //
            // ARRANGE
            //

            ClearTable(Context.VehicleReports);
            var vehicle = Context.Vehicles.Add(new Vehicle());
            var review = Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle});
            Context.SaveChanges();

            //
            // ACT
            //

            var controller = NewController();
            var okNegotiatedContentResult = controller.Delete(review.Id) as OkNegotiatedContentResult<ServiceResult<bool>>;
            Assert.IsNotNull(okNegotiatedContentResult, "Response was not ok");
            var isSuccess = okNegotiatedContentResult.Content.Payload;
            Assert.IsTrue(isSuccess);

            //
            // ASSERT
            //

            Assert.AreEqual(0, Context.VehicleReports.Count(x => !x.DeletedOn.HasValue));
        }
    }
}