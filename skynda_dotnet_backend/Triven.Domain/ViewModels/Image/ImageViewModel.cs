using System;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Image
{
    public class ImageViewModel : BaseViewModel
    {
        public ImageViewModel()
        {
            FileType = "png";
            ContainerName = "image".ToLower();
            BlobName = Guid.NewGuid().ToString();
            ContentType = "image/png";
        }

        public string Url { get; set; }
        public string BlobName { get; set; }
        public string ContainerName { get; set; }
        public string Base64File { get; set; }
        public string FileType { get; set; }
        public string ContentType { get; set; }
        public ImageCropInfoViewModel CropInfo { get; set; }

        public static class Factory
        {
            public static ImageViewModel Create(string url, string blobName, string containerName)
            {
                return new ImageViewModel
                {
                    Url = url,
                    BlobName = blobName,
                    ContainerName = containerName
                };
            }

            public static ImageViewModel CreateForDisplay(string url)
            {
                return new ImageViewModel {Url = url};
            }


            public static ImageViewModel CreateWithBase64(string base64File)
            {
                return new ImageViewModel {Base64File = base64File};
            }
        }
    }
}