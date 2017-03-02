using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Runtime.InteropServices;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Triven.Application.Results;
using Triven.Domain.Constants;
using Triven.Domain.Extensions;
using Triven.Domain.Models;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.BlobStorage;
using Triven.Domain.ViewModels.Image;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Services
{
    public class BlobStorageService : IBlobStorageService<ServiceResult>
    {
        private readonly CloudBlobClient _blobClient;

        public BlobStorageService()
        {                        
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting(AppSettings.StorageConnectionString));
            _blobClient = storageAccount.CreateCloudBlobClient();
        }

        public ServiceResult CreateContainer(CreateContainerViewModel viewModel)
        {
            CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName);
            var isCreated = container.CreateIfNotExists();
            return ServiceResult.Factory.Handle(isCreated, isCreated);
        }

        public ServiceResult DeleteContainer(DeleteContainerViewModel viewModel)
        {
            CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName);
            var isSuccess = container.DeleteIfExists();
            return ServiceResult.Factory.Handle(isSuccess, isSuccess);
        }

        public ServiceResult Upload(UploadBlobViewModel viewModel)
        {
            CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName);
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(viewModel.BlobName);

            blockBlob.UploadFromStream(new MemoryStream(viewModel.ByteArray));

            return ServiceResult.Factory.Success(true);
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
            CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName);
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(viewModel.BlobName);

            using (var memoryStream = new MemoryStream())
            {
                blockBlob.DownloadToStream(memoryStream);
                return ServiceResult.Factory.Success(memoryStream);
            }
        }

        public ServiceResult Delete(DeleteBlobViewModel viewModel)
        {
            CloudBlobContainer container = _blobClient.GetContainerReference(viewModel.ContainerName);
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(viewModel.BlobName);
            blockBlob.Delete();
            return ServiceResult.Factory.Success();
        }

        public IImage HandleMedia(ImageViewModel mediaViewModel, IImage existingMedia, bool urlChanged)
        {
            if (mediaViewModel == null)
                return null;

            if (!mediaViewModel.Base64File.IsNullOrEmpty())
            {
                byte[] bytes = GetBytes(mediaViewModel.Base64File);
                bytes = CropImage(bytes, mediaViewModel.CropInfo, mediaViewModel.FileType);

                var result = Upload(new UploadBlobViewModel
                {
                    ContainerName = mediaViewModel.ContainerName,
                    BlobName = mediaViewModel.BlobName,
                    ByteArray = bytes
                });

                if (result.IsSuccessful)
                {
                    //return ImageRepository.save(
                }
            }

            return null;
        }

        private byte[] GetBytes(string str)
        {
            byte[] bytes = new byte[str.Length * sizeof(char)];
            Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
            return bytes;
        }

        static string GetString(byte[] bytes)
        {
            char[] chars = new char[bytes.Length / sizeof(char)];
            Buffer.BlockCopy(bytes, 0, chars, 0, bytes.Length);
            return new string(chars);
        }

        public IImage HandleMedia(ImageViewModel mediaViewModel, IImage existingMedia)
        {
            throw new System.NotImplementedException();
        }

        public byte[] CropImage(byte[] imageInByte, ImageCropInfoViewModel cropInfo, string formatName = "jpg")
        {
            if (cropInfo == null || !cropInfo.IsCrop)
                return imageInByte;

            using (MemoryStream memoryStream = new MemoryStream(imageInByte))
            {
                using (Image newImage = Image.FromStream(memoryStream))
                {
                    var croppedImage = newImage.CropImage(new Rectangle(300, 150, 200, 200));
                    ImageConverter converter = new ImageConverter();
                    byte[] imgArray = (byte[])converter.ConvertTo(croppedImage, typeof(byte[]));
                    return imgArray;
                }
            }
           

            return imageInByte;
        }


        public void FromBase64ToUrl(ImageViewModel viewModel)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult TryDeleteBlob(VehicleImageFileToDeleteViewModel viewModel)
        {
            throw new System.NotImplementedException("This is not needed to be implemented in near future.");
        }
    }

}