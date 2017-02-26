using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Triven.Application.Results;
using Triven.Domain.Models;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.BlobStorage;
using Triven.Domain.ViewModels.Image;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application.Services
{
    public class BlobStorageService : IBlobStorageService<ServiceResult>
    {
        const string StorageConnectionString = "StorageConnectionString";

        public ServiceResult CreateContainer(CreateContainerViewModel viewModel)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting(StorageConnectionString));
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(viewModel.ContainerName);
            var isCreated = container.CreateIfNotExists();

            return ServiceResult.Factory.Success(isCreated);
        }

        public ServiceResult DeleteContainer(DeleteContainerViewModel viewModel)
        {
            throw new System.NotImplementedException("This is not needed to be implemented in near future.");
        }

        public ServiceResult Upload(UploadBlobViewModel viewModel)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting(StorageConnectionString));
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(viewModel.ContainerName);
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(viewModel.BlobName);

            blockBlob.UploadFromStream(new MemoryStream(viewModel.ByteArray));

            return ServiceResult.Factory.Success(true);
        }

        [Obsolete("Remove")]
        public ServiceResult UploadStream(UploadBlobViewModel viewModel) => Upload(viewModel);

        public ServiceResult List(ListBlobsViewModel viewModel)
        {
            List<string> list = new List<string>();

            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting(StorageConnectionString));
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(viewModel.ContainerName);

            foreach (IListBlobItem item in container.ListBlobs(null, false))
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

            return ServiceResult.Factory.Success(list);
        }

        public ServiceResult Download(DownloadBlobViewModel viewModel)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting(StorageConnectionString));
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(viewModel.ContainerName);
            CloudBlockBlob blockBlob2 = container.GetBlockBlobReference(viewModel.BlobName);

            var memoryStream = new MemoryStream();
            blockBlob2.DownloadToStream(memoryStream);
            return ServiceResult.Factory.Success(memoryStream);
        }

        public ServiceResult Delete(DeleteBlobViewModel viewModel)
        {
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting(StorageConnectionString));
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference(viewModel.ContainerName);
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(viewModel.BlobName);
            blockBlob.Delete();
            return ServiceResult.Factory.Success();
        }

        public IImage HandleMedia(ImageViewModel mediaViewModel, IImage existingMedia, bool urlChanged)
        {
            throw new System.NotImplementedException();
        }

        public IImage HandleMedia(ImageViewModel mediaViewModel, IImage existingMedia)
        {
            throw new System.NotImplementedException();
        }

        public byte[] CropImage(byte[] imageInByte, ImageCropInfoViewModel cropInfo)
        {
            throw new System.NotImplementedException("This is not needed to be implemented in near future.");
        }

        public byte[] CropImage(byte[] imageInByte, ImageCropInfoViewModel cropInfo, string formatName)
        {
            throw new System.NotImplementedException("This is not needed to be implemented in near future.");
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