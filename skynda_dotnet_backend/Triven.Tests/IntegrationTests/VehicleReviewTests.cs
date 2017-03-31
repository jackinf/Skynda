using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using NUnit.Framework;
using Triven.API.Controllers;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.ViewModels.Vehicle;
using Triven.FunctionalTests.Utils;
using Triven.FunctionalTests.Utils.EntityHelpers;

namespace Triven.FunctionalTests.IntegrationTests
{
    public class VehicleReviewTests : TestsBase
    {
        [DebuggerStepThrough]
        private VehicleReviewController NewController() => new VehicleReviewController();

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
            var review1 = VehicleReviewUtils.Create(vehicle1.Id);
            var review2 = VehicleReviewUtils.Create(vehicle2.Id);

            //
            // ACT
            //

            var results = NewController().GetAll().GetOkPayload<IEnumerable<VehicleReviewViewModel>>().ToList();

            //
            // ASSERT
            //

            Assert.AreEqual(2, results.Count);

            var firstReview = results.Single(x => x.Id == review1.Id);
            var secondReview = results.Single(x => x.Id == review2.Id);
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
            var review1 = VehicleReviewUtils.Create(vehicle1.Id);
            var review2 = VehicleReviewUtils.Create(vehicle1.Id);
            var review3 = VehicleReviewUtils.Create(vehicle2.Id);

            //
            // ACT
            //

            var results = NewController().GetAllByVehicle(vehicle1.Id).GetOkPayload<IList<VehicleReviewViewModel>>();

            //
            // ASSERT
            //

            Assert.AreEqual(2, results.Count);

            var firstReview = results.Single(x => x.Id == review1.Id);
            var secondReview = results.Single(x => x.Id == review2.Id);
            Assert.IsNull(results.SingleOrDefault(x => x.Id == review3.Id));
            // TODO: assert
        }

        [Test]
        public void should_get()
        {
            //
            // ARRANGE
            //

            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();
            var review1 = VehicleReviewUtils.Create(vehicle1.Id);

            //
            // ACT
            //

            var result = NewController().Get(review1.Id).GetOkPayload<VehicleReviewViewModel>();

            //
            // ASSERT
            //

            Assert.AreEqual(review1.Id, result.Id);
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
            var requestViewModel = new VehicleReviewViewModel
            {
                Rating = 2,
                Text = "review123",
                VehicleId = vehicle1.Id
            };
            var result = controller.Add(requestViewModel).GetOkPayload<VehicleReviewViewModel>();

            //
            // ASSERT
            //

            var fromDb = GetFromDbStrict<VehicleReview>(result.Id);
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
            var review1 = VehicleReviewUtils.Create(vehicleId: vehicle1.Id, rating: 4, text: $"created_{Guid.NewGuid()}");

            //
            // ACT
            //

            var controller = NewController();
            var requestViewModel = new VehicleReviewViewModel
            {
                Id = review1.Id,
                Rating = 5,
                Text = $"updated_{Guid.NewGuid()}",
                VehicleId = vehicle2.Id
                //LogoId = 0,
                //VideoId = 0
            };
            var result = controller.Update(review1.Id, requestViewModel).GetOkPayload<VehicleReviewViewModel>();

            //
            // ASSERT
            //

            Assert.AreEqual(review1.Id, result.Id);
        }

        [Test]
        public void should_delete()
        {
            //
            // ARRANGE
            //
            
            var vehicle1 = VehicleUtils.CreateWithVehicleModelAndImage();
            var review1 = VehicleReviewUtils.Create(vehicle1.Id);
            
            //
            // ACT
            //
            
            var isSuccess = NewController().Delete(review1.Id).GetOkPayload<bool>();

            //
            // ASSERT
            //

            Assert.IsTrue(isSuccess);
            var fromDb = GetFromDb<VehicleReview>(review1.Id);
            Assert.IsTrue(fromDb.DeletedOn.HasValue);
        }
    }
}