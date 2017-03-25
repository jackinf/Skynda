using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using AutoMapper;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Constants;
using Triven.Domain.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.BlobStorage;
using Triven.Domain.ViewModels.Image;
using Triven.Domain.ViewModels.Vehicle;
using Image = Triven.Data.EntityFramework.Models.Image;

namespace Triven.Application.Services
{
    public class BlobStorageService : IBlobStorageService
    {
        private readonly CloudBlobClient _blobClient;
        private readonly IImageRepository<Image> _imageRepository;
        private readonly IVehicleImageRepository<VehicleImage> _vehicleImageRepository;

        public BlobStorageService()
        {                        
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting(AppSettings.StorageConnectionString));
            _blobClient = storageAccount.CreateCloudBlobClient();
            _imageRepository = IoC.Get<IImageRepository<Image>>();
            _vehicleImageRepository = IoC.Get<IVehicleImageRepository<VehicleImage>>();
        }

        public ServiceResult<bool> CreateContainer(CreateContainerViewModel viewModel)
        {
            try
            {
                CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName);
                bool isCreated = container.CreateIfNotExists();
                return ServiceResult<bool>.Factory.Success(isCreated);
            }
            catch (Exception ex)
            {
                return ServiceResult<bool>.Factory.Fail(ex);
            }
            
        }

        public ServiceResult<bool> DeleteContainer(DeleteContainerViewModel viewModel)
        {
            try
            {
                CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName);
                bool isSuccess = container.DeleteIfExists();
                return ServiceResult<bool>.Factory.Success(isSuccess);
            }
            catch (Exception exception)
            {
                return ServiceResult<bool>.Factory.Fail(exception);
            }
            
        }

        public ServiceResult<Uri> Upload(UploadBlobViewModel viewModel)
        {
            try
            {
                CreateContainer(new CreateContainerViewModel { ContainerName = viewModel.ContainerName.ToLower() });

                CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName.ToLower());
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(viewModel.BlobName);

                blockBlob.Properties.ContentType = viewModel.ContentType;

                using (var stream = new MemoryStream(viewModel.ByteArray))
                {
                    stream.Seek(0, SeekOrigin.Begin);
                    blockBlob.UploadFromStream(stream);
                }

                //blockBlob.SetProperties();


                return ServiceResult<Uri>.Factory.Success(blockBlob.Uri);
            }
            catch (Exception exception)
            {
                return ServiceResult<Uri>.Factory.Fail(exception);
            }
            
        }

        public ServiceResult<List<string>> List(ListBlobsViewModel viewModel)
        {
            var list = new List<string>();

            CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName.ToLower());

            foreach (IListBlobItem item in container.ListBlobs())
            {
                if (item.GetType() == typeof(CloudBlockBlob))
                {
                    CloudBlockBlob blob = (CloudBlockBlob)item;
                    list.Add($"Block blob of length {blob.Properties.Length}: {blob.Uri}");

                }
                else if (item.GetType() == typeof(CloudPageBlob))
                {
                    CloudPageBlob pageBlob = (CloudPageBlob)item;
                    list.Add($"Page blob of length {pageBlob.Properties.Length}: {pageBlob.Uri}");

                }
                else if (item.GetType() == typeof(CloudBlobDirectory))
                {
                    CloudBlobDirectory directory = (CloudBlobDirectory)item;
                    list.Add($"Directory: {directory.Uri}");
                }
            }

            return ServiceResult<List<string>>.Factory.Handle(list.Any(), list);
        }

        public ServiceResult<MemoryStream> Download(DownloadBlobViewModel viewModel)
        {
            try
            {
                CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName.ToLower());
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(viewModel.BlobName);

                using (var memoryStream = new MemoryStream())
                {
                    blockBlob.DownloadToStream(memoryStream);
                    return ServiceResult<MemoryStream>.Factory.Success(memoryStream);
                }
            }
            catch (Exception exception)
            {
                return ServiceResult<MemoryStream>.Factory.Fail(exception);
            }
        }

        public ServiceResult<bool> Delete(DeleteBlobViewModel viewModel)
        {
            try
            {
                CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName.ToLower());
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(viewModel.BlobName);
                blockBlob.DeleteIfExists();
                return ServiceResult<bool>.Factory.Success();
            }
            catch (Exception exception)
            {
                return ServiceResult<bool>.Factory.Fail(exception);
            }
            
        }

        public IImage HandleMedia(ImageViewModel mediaViewModel, IImage existingMedia)
        {
            //TODO see if logic is how it's suppose to . It feels like checks can be simplified and there's too much...

            if (mediaViewModel == null)
                return null;

            bool isUrlSame = !string.IsNullOrWhiteSpace(existingMedia?.Url) && string.Equals(existingMedia.Url, mediaViewModel.Url, 
                StringComparison.InvariantCultureIgnoreCase);

            if (!string.IsNullOrWhiteSpace(mediaViewModel.Base64File))
            {
                //"data:image/png;base64,ivorasgkas..." --this comes in

                //Remove data: and read content type
                var indexOfTypeEnd = mediaViewModel.Base64File.IndexOf(";", StringComparison.Ordinal);
                var contentType = mediaViewModel.Base64File.Substring(5, mediaViewModel.Base64File.Length - (mediaViewModel.Base64File.Length - indexOfTypeEnd) - 5 );

                //substring for base64 string
                var indexOfComma = mediaViewModel.Base64File.IndexOf(",", StringComparison.Ordinal) + 1;
                string base64String = mediaViewModel.Base64File.Substring(indexOfComma, mediaViewModel.Base64File.Length - indexOfComma);

                if (!string.IsNullOrWhiteSpace(base64String))
                {
                    byte[] bytes = Convert.FromBase64String(base64String);
                    
                    var imageContainerName = mediaViewModel.ContainerName.ToLower();
                    var imageBlobName = mediaViewModel.BlobName;
                    var imageConvertType = contentType;
                    var imageUploadResult = Upload(new UploadBlobViewModel
                    {
                        ContainerName = imageContainerName,
                        BlobName = imageBlobName,
                        ByteArray = bytes,
                        ContentType = imageConvertType
                    });

                    if (imageUploadResult.IsSuccessful)
                    {
                        ImageViewModel viewModel = ImageViewModel.Factory.Create(
                            imageUploadResult.Payload.ToString(), 
                            mediaViewModel.BlobName, 
                            mediaViewModel.ContainerName);

                        var thumbnailBytes = TryCreateThumbnail(bytes, out bool thumbnailCreatedSuccessfully);
                        if (thumbnailCreatedSuccessfully)
                        {
                            string thumbnailBlobName = $"{imageBlobName}_THUMBNAIL";
                            var thumbnailUploadResult = Upload(new UploadBlobViewModel
                            {
                                ContainerName = imageContainerName,
                                BlobName = thumbnailBlobName,
                                ByteArray = thumbnailBytes,
                                ContentType = imageConvertType
                            });
                            viewModel.ThumbnailBlobName = thumbnailBlobName;
                            viewModel.ThumbnailUrl = thumbnailUploadResult.Payload.ToString();
                        }

                        var mappedImageEntity = Mapper.Map<ImageViewModel, Image>(viewModel);

                        if (existingMedia == null || existingMedia.Id == 0)
                            return _imageRepository.Add(mappedImageEntity).ContextObject;

                        mappedImageEntity.Id = existingMedia.Id;

                        return mappedImageEntity;
                    }

                    return existingMedia;
                }
                
            }

            if(string.IsNullOrWhiteSpace(mediaViewModel.Url))            
                return null;

            if (isUrlSame)
                return existingMedia;

            //Save already handled image.
            ImageViewModel newImage = ImageViewModel.Factory
                    .Create(mediaViewModel.Url, mediaViewModel.BlobName, mediaViewModel.ContainerName);

            var mappedNewImageEntity = Mapper.Map<ImageViewModel, Image>(newImage);

            _imageRepository.Add(mappedNewImageEntity);

            DeleteBlobIfExists(existingMedia);

            return mappedNewImageEntity;
        }

        public void HandleMediaCollection(int vehicleId, IList<VehicleImageViewModel> mediaViewModel, IList<VehicleImageViewModel> existingMedia)
        {
            if (existingMedia.Any())
            {
                foreach (var existingVehicleImage in existingMedia)
                {
                    bool exists = mediaViewModel.Any() && mediaViewModel.Any(
                        x => x.Image.BlobName == existingVehicleImage.Image.BlobName);

                    if (!exists)
                    {
                        _vehicleImageRepository.Delete(existingVehicleImage.Id);
                    }
                }
            }

            if (!mediaViewModel.Any()) return;

            foreach (var imageViewModel in mediaViewModel)
            {
                var existingMediaSingle = existingMedia.FirstOrDefault(x => x.Image.BlobName == imageViewModel.Image.BlobName);

                var image = new Image();

                if (existingMediaSingle != null)
                {
                    Mapper.Map(existingMediaSingle.Image, image);
                }
                
                var imageResult = HandleMedia(imageViewModel.Image, image);

                bool exists = existingMedia.Any() &&
                              existingMedia.Any(x =>
                                  x.Image.BlobName == imageResult.BlobName);

                var entityVehicleImage = new VehicleImage
                {
                    Vehicle = new Vehicle {Id = vehicleId},
                    Image = imageResult as Image
                };

                if (!exists)
                {
                    _vehicleImageRepository.Add(entityVehicleImage);
                }
            }            
        }

        private void DeleteBlobIfExists(IImage existingMedia)
        {
            if (!string.IsNullOrWhiteSpace(existingMedia?.BlobName) && !string.IsNullOrWhiteSpace(existingMedia.ContainerName))
            {
                Delete(new DeleteBlobViewModel
                {
                    BlobName = existingMedia.BlobName,
                    ContainerName = existingMedia.ContainerName
                });
            }
        }

        private byte[] TryCreateThumbnail(byte[] originalImageBytes, out bool success)
        {
            // 320 x 180 = aspect ratio 16/9. These dimensions are used when cropping and displaying images in search results.
            const int thumbnailWidth = 320;
            const int thumbnailHeight = 180;

            MemoryStream ms = new MemoryStream(originalImageBytes);
            var originalImage = System.Drawing.Image.FromStream(ms);
            System.Drawing.Image thumb = originalImage.GetThumbnailImage(thumbnailWidth, thumbnailHeight, () => false, IntPtr.Zero);

            ImageConverter converter = new ImageConverter();
            var thumbnailBytes = (byte[])converter.ConvertTo(thumb, typeof(byte[]));
            success = thumbnailBytes?.Length > 0;
            return thumbnailBytes;
        }

    }

}