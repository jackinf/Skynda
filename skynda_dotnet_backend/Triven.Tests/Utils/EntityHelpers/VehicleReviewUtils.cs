using System;
using Triven.Data.EntityFramework.Models;

namespace Triven.FunctionalTests.Utils.EntityHelpers
{
    internal static class VehicleReviewUtils
    {
        public static VehicleReview Create(
            int vehicleId, 
            int? logoId = null, 
            int? videoId = null,
            int? rating = null,
            string text = null)
        {
            using (var context = EntityFrameworkTestHelper.CreateContext())
            {
                var random = new Random();
                var newVehicle = context.VehicleReviews.Add(new VehicleReview
                {
                    LogoId = logoId ?? 0,
                    VideoId = videoId ?? 0,
                    Rating = rating ?? random.Next(1, 5),
                    Text = text ?? Guid.NewGuid().ToString(),

                    VehicleId = vehicleId
                });
                context.SaveChanges();
                return newVehicle;
            }
        }
    }
}