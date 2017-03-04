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
    public class VehicleReviewIntegrationTests : IntegrationTestBase
    {
        private VehicleReviewController NewController() => new VehicleReviewController();

        [Test]
        public void should_get_all()
        {
            //
            // ARRANGE
            //

            ClearTable(Context.VehicleReviews);
            Context.VehicleReviews.Add(new VehicleReview());
            Context.VehicleReviews.Add(new VehicleReview());
            Context.SaveChanges();

            //
            // ACT
            //

            var controller = NewController();
            var okNegotiatedContentResult = controller.GetAll() as OkNegotiatedContentResult<ServiceResult<IEnumerable<VehicleReviewViewModel>>>;
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

            ClearTable(Context.VehicleReviews);
            var vehicle = Context.Vehicles.Add(new Vehicle());
            Context.VehicleReviews.Add(new VehicleReview {Vehicle = vehicle});
            Context.VehicleReviews.Add(new VehicleReview());
            Context.SaveChanges();

            //
            // ACT
            //

            var controller = NewController();
            var okNegotiatedContentResult = controller.GetAllByVehicle(vehicle.Id) as OkNegotiatedContentResult<ServiceResult<IList<VehicleReviewViewModel>>>;
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

            ClearTable(Context.VehicleReviews);
            var review = Context.VehicleReviews.Add(new VehicleReview());
            Context.VehicleReviews.Add(new VehicleReview());
            Context.SaveChanges();

            //
            // ACT
            //

            var controller = NewController();
            var okNegotiatedContentResult = controller.Get(review.Id) as OkNegotiatedContentResult<ServiceResult<VehicleReviewViewModel>>;
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

            ClearTableAndApply(Context.VehicleReviews, Context);

            //
            // ACT
            //

            var controller = NewController();
            var requestViewModel = new VehicleReviewViewModel
            {
                Rating = 2,
                Text = "review123"
            };
            var okNegotiatedContentResult = controller.Add(requestViewModel) as OkNegotiatedContentResult<ServiceResult<VehicleReviewViewModel>>;
            Assert.IsNotNull(okNegotiatedContentResult, "Response was not ok");
            var result = okNegotiatedContentResult.Content.Payload;

            //
            // ASSERT
            //

            var vehicleReview = Context.VehicleReviews.Single();
            Assert.AreEqual(vehicleReview.Id, result.Id);
        }

        [Test]
        public void should_update()
        {
            //
            // ARRANGE
            //

            ClearTable(Context.VehicleReviews);
            var review = Context.VehicleReviews.Add(new VehicleReview {Rating = 1, Text = "test123"});
            Context.SaveChanges();

            //
            // ACT
            //

            var controller = NewController();
            var requestViewModel = new VehicleReviewViewModel {Rating = 2, Text = "test123_updated"};
            var okNegotiatedContentResult = controller.Update(review.Id, requestViewModel) as OkNegotiatedContentResult<ServiceResult<VehicleReviewViewModel>>;
            Assert.IsNotNull(okNegotiatedContentResult, "Response was not ok");
            var result = okNegotiatedContentResult.Content.Payload;

            //
            // ASSERT
            //

            Assert.AreEqual(review.Id, result.Id);
        }

        [Test]
        public void should_delete()
        {
            //
            // ARRANGE
            //

            ClearTable(Context.VehicleReviews);
            var review = Context.VehicleReviews.Add(new VehicleReview());
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

            Assert.AreEqual(0, Context.VehicleReviews.Count(x => !x.DeletedOn.HasValue));
        }
    }
}