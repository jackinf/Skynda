using System;
using Triven.Data.EntityFramework.Models;

namespace Triven.FunctionalTests.Utils.EntityHelpers
{
    internal static class ImageUtils
    {
        public static Image Create()
        {
            using (var context = EntityFrameworkTestHelper.CreateContext())
            {
                var newImage = context.Images.Add(new Image
                {
                    Url = Guid.NewGuid().ToString(),
                    BlobName = Guid.NewGuid().ToString(),
                    ContainerName = "image",
                    ThumbnailUrl = Guid.NewGuid().ToString(),
                    ThumbnailBlobName = Guid.NewGuid().ToString()
                });
                context.SaveChanges();
                return newImage;
            }
        }
    }
}