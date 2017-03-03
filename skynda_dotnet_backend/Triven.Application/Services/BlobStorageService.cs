using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using AutoMapper;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Triven.Application.Results;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Constants;
using Triven.Domain.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.BlobStorage;
using Triven.Domain.ViewModels.Image;

namespace Triven.Application.Services
{
    public class BlobStorageService : IBlobStorageService<ServiceResult>
    {
        private readonly CloudBlobClient _blobClient;
        private readonly IImageRepository<Image> _imageRepository;

        public BlobStorageService()
        {                        
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting(AppSettings.StorageConnectionString));
            _blobClient = storageAccount.CreateCloudBlobClient();
            _imageRepository = IoC.Get<IImageRepository<Image>>();
        }

        public ServiceResult CreateContainer(CreateContainerViewModel viewModel)
        {
            try
            {
                CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName);
                var isCreated = container.CreateIfNotExists();
                return ServiceResult.Factory.Handle(isCreated, isCreated);
            }
            catch (Exception ex)
            {
                return ServiceResult.Factory.Fail(ex.Message);
            }
            
        }

        public ServiceResult DeleteContainer(DeleteContainerViewModel viewModel)
        {
            try
            {
                CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName);
                var isSuccess = container.DeleteIfExists();
                return ServiceResult.Factory.Success(isSuccess);
            }
            catch (Exception exception)
            {
                return ServiceResult.Factory.Fail(exception.Message);
            }
            
        }

        public ServiceResult Upload(UploadBlobViewModel viewModel)
        {
            try
            {
                CreateContainer(new CreateContainerViewModel { ContainerName = viewModel.ContainerName });

                CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName);
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(viewModel.BlobName);

                blockBlob.UploadFromStream(new MemoryStream(viewModel.ByteArray));

                return ServiceResult.Factory.Success(blockBlob.Uri);
            }
            catch (Exception exception)
            {
                return ServiceResult.Factory.Fail(exception.Message);
            }
            
        }

        public ServiceResult List(ListBlobsViewModel viewModel)
        {
            var list = new List<string>();

            CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName);

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

            return ServiceResult.Factory.Handle(list.Any(), list);
        }

        public ServiceResult Download(DownloadBlobViewModel viewModel)
        {
            try
            {
                CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName);
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(viewModel.BlobName);

                using (var memoryStream = new MemoryStream())
                {
                    blockBlob.DownloadToStream(memoryStream);
                    return ServiceResult.Factory.Success(memoryStream);
                }
            }
            catch (Exception exception)
            {
                return ServiceResult.Factory.Fail(exception.Message);
            }
            
        }

        public ServiceResult Delete(DeleteBlobViewModel viewModel)
        {
            try
            {
                CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName);
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(viewModel.BlobName);
                blockBlob.DeleteIfExists();
                return ServiceResult.Factory.Success();
            }
            catch (Exception exception)
            {
                return ServiceResult.Factory.Fail(exception.Message);
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
                byte[] bytes = GetBytes(mediaViewModel.Base64File);

                var result = Upload(new UploadBlobViewModel
                {
                    ContainerName = mediaViewModel.ContainerName,
                    BlobName = mediaViewModel.BlobName,
                    ByteArray = bytes
                });

                if (result.IsSuccessful)
                {
                    ImageViewModel viewModel = ImageViewModel.Factory
                        .Create(result.Payload.ToString(), mediaViewModel.BlobName, mediaViewModel.ContainerName);

                    var mappedImageEntity = Mapper.Map<ImageViewModel, Image>(viewModel);

                    var added = _imageRepository.Add(mappedImageEntity);

                    DeleteBlobIfExists(existingMedia);

                    //var mappedResult = Mapper.Map<Image, ImageViewModel>(add.ContextObject);
                    return added.ContextObject;
                }

                return existingMedia;
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

        private byte[] GetBytes(string str)
        {
            byte[] bytes = new byte[str.Length * sizeof(char)];
            Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
            return bytes;
        }

        //static string GetString(byte[] bytes)
        //{
        //    char[] chars = new char[bytes.Length / sizeof(char)];
        //    Buffer.BlockCopy(bytes, 0, chars, 0, bytes.Length);
        //    return new string(chars);
        //}

        //public byte[] CropImage(byte[] imageInByte, ImageCropInfoViewModel cropInfo, string formatName = "jpg")
        //{
        //    if (cropInfo == null || !cropInfo.IsCrop)
        //        return imageInByte;

        //    using (MemoryStream memoryStream = new MemoryStream(imageInByte))
        //    {
        //        using (Image newImage = Image.FromStream(memoryStream))
        //        {
        //            var croppedImage = newImage.CropImage(new Rectangle(300, 150, 200, 200));
        //            ImageConverter converter = new ImageConverter();
        //            byte[] imgArray = (byte[])converter.ConvertTo(croppedImage, typeof(byte[]));
        //            imageInByte = imgArray;
        //        }
        //    }

        //    return imageInByte;
        //}


        public void FromBase64ToUrl(ImageViewModel viewModel)
        {
            throw new System.NotImplementedException();
        }

    }

}