//using System.Collections.Generic;
//using System.Linq;
//using NUnit.Framework;
//using Triven.API.Controllers;
//using Triven.Data.EntityFramework.Models;
//using Triven.Domain.ViewModels.Vehicle;
//using Triven.FunctionalTests.Utils;

//namespace Triven.FunctionalTests.IntegrationTests
//{
//    public class VehicleReportIntegrationTests : TestsBase
//    {
//        private VehicleReportController NewController() => new VehicleReportController();

//        [SetUp]
//        public void SetUp() => ClearAllTablesAndApply();

//        [Test]
//        public void should_get_all()
//        {
//            //
//            // ARRANGE
//            //

//            ClearTable(Context.VehicleReports);
//            var vehicle = Context.Vehicles.Add(new Vehicle());
//            Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle});
//            Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle});
//            Context.SaveChanges();

//            //
//            // ACT
//            //

//            var controller = NewController();
//            var results = controller.GetAll().GetOkPayload<IEnumerable<VehicleReportViewModel>>();

//            //
//            // ASSERT
//            //

//            Assert.AreEqual(2, results.Count());
//        }

//        [Test]
//        public void should_get_all_by_vehicle()
//        {
//            //
//            // ARRANGE
//            //

//            ClearTable(Context.VehicleReports);
//            var vehicle1 = Context.Vehicles.Add(new Vehicle());
//            var vehicle2 = Context.Vehicles.Add(new Vehicle());
//            Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle1});
//            Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle2});
//            Context.SaveChanges();

//            //
//            // ACT
//            //

//            var controller = NewController();
//            var results = controller.GetAllByVehicle(vehicle1.Id).GetOkPayload<IList<VehicleReportViewModel>>();

//            //
//            // ASSERT
//            //

//            Assert.AreEqual(1, results.Count());
//        }

//        [Test]
//        public void should_get()
//        {
//            //
//            // ARRANGE
//            //

//            ClearTable(Context.VehicleReports);
//            var vehicle = Context.Vehicles.Add(new Vehicle());
//            var review = Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle});
//            Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle});
//            Context.SaveChanges();

//            //
//            // ACT
//            //

//            var controller = NewController();
//            var result = controller.Get(review.Id).GetOkPayload<VehicleReportViewModel>();

//            //
//            // ASSERT
//            //

//            Assert.AreEqual(review.Id, result.Id);
//        }

//        [Test]
//        public void should_add()
//        {
//            //
//            // ARRANGE
//            //

//            ClearTable(Context.Vehicles);
//            ClearTable(Context.VehicleReports);
//            var vehicle = Context.Vehicles.Add(new Vehicle());
//            Context.SaveChanges();

//            //
//            // ACT
//            //

//            var controller = NewController();
//            var requestViewModel = new VehicleReportViewModel
//            {
//                Description = "test123"
//            };
//            var result = controller.Add(vehicle.Id, requestViewModel).GetOkPayload<VehicleReportViewModel>();

//            //
//            // ASSERT
//            //

//            var VehicleReport = Context.VehicleReports.Single();
//            Assert.AreEqual(VehicleReport.Id, result.Id);
//        }

//        [Test]
//        public void should_update()
//        {
//            //
//            // ARRANGE
//            //

//            ClearTable(Context.VehicleReports);
//            var report = Context.VehicleReports.Add(new VehicleReport { Description = "test123" });
//            var vehicle = Context.Vehicles.Add(new Vehicle());
//            Context.SaveChanges();

//            //
//            // ACT
//            //

//            var controller = NewController();
//            var requestViewModel = new VehicleReportViewModel { Description = "test123_updated" };
//            var result = controller.Update(vehicle.Id, report.Id, requestViewModel).GetOkPayload<VehicleReportViewModel>();

//            //
//            // ASSERT
//            //

//            Assert.AreEqual(report.Id, result.Id);
//            Assert.AreEqual("test123_updated", result.Description);
//        }

//        [Test]
//        public void should_delete()
//        {
//            //
//            // ARRANGE
//            //

//            ClearTable(Context.VehicleReports);
//            var vehicle = Context.Vehicles.Add(new Vehicle());
//            var review = Context.VehicleReports.Add(new VehicleReport {Vehicle = vehicle});
//            Context.SaveChanges();

//            //
//            // ACT
//            //

//            var controller = NewController();
//            var isSuccess = controller.Delete(review.Id).GetOkPayload<bool>();

//            //
//            // ASSERT
//            //

//            Assert.IsTrue(isSuccess);
//            Assert.AreEqual(0, Context.VehicleReports.Count(x => !x.DeletedOn.HasValue));
//        }
//    }
//}