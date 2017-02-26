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
        public ServiceResult CreateContainer(CreateContainerViewModel viewModel)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult DeleteContainer(DeleteContainerViewModel viewModel)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult Upload(UploadBlobViewModel viewModel)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult UploadStream(UploadBlobViewModel viewModel)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult List(ListBlobsViewModel viewModel)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult Download(DownloadBlobViewModel viewModel)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult Delete(DeleteBlobViewModel viewModel)
        {
            throw new System.NotImplementedException();
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
            throw new System.NotImplementedException();
        }

        public byte[] CropImage(byte[] imageInByte, ImageCropInfoViewModel cropInfo, string formatName)
        {
            throw new System.NotImplementedException();
        }

        public void FromBase64ToUrl(ImageViewModel viewModel)
        {
            throw new System.NotImplementedException();
        }

        public ServiceResult TryDeleteBlob(VehicleImageFileToDeleteViewModel viewModel)
        {
            throw new System.NotImplementedException();
        }
    }
}