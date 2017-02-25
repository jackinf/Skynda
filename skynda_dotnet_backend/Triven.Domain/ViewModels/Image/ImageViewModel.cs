﻿namespace Triven.Domain.ViewModels.Image
{
    public class ImageModel
    {
        public string Url { get; set; }
        public string BlobName { get; set; }
        public string ContainerName { get; set; }
        public string Base64File { get; set; }
        private ImageCropInfoModel CropInfo { get; set; }

        public static class Factory
        {
            public static ImageModel Create(string url, string blobName, string containerName)
            {
                return new ImageModel
                {
                    Url = url,
                    BlobName = blobName,
                    ContainerName = containerName
                };
            }

            public static ImageModel CreateForDisplay(string url)
            {
                return new ImageModel {Url = url};
            }


            public static ImageModel CreateWithBase64(string base64File)
            {
                return new ImageModel {Base64File = base64File};
            }
        }

        public static class Helper
        {

            /**
             * Checks if Entity image from the database has been changed in relation to dto image (received from user)
             * @param entity - db image
             * @param dto - image received from the form
             * @return - is url not the same?
             */
            //public static bool IsUrlChanged(ImageStorable<Image> entity, ImageStorable<ImageDto> dto)
            //{
            //    if (entity == null)
            //    {
            //        return dto.getImage() != null && dto.getImage().getUrl() != null && dto.getImage().getUrl().trim().isEmpty();
            //    }
            //    else
            //    {
            //        return (entity.getImage() != null && dto.getImage() != null && entity.getImage().getUrl() != null)
            //                && (!entity.getImage().getUrl().trim().isEmpty())
            //                && (!dto.getImage().getUrl().trim().isEmpty())
            //                && entity.getImage().getUrl().equals(dto.getImage().getUrl());
            //    }
            //}
        }
    }
}