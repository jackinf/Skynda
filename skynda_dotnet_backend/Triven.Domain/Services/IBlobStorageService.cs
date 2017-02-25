using System;
using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.BlobStorage;
using Triven.Domain.ViewModels.BlobStorage.Response;
using Triven.Domain.ViewModels.Image;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Domain.Services
{
    public interface IBlobStorageService<out TResult> where TResult : IServiceResult
    {
        TResult CreateContainer(CreateContainerViewModel viewModel);
        TResult DeleteContainer(DeleteContainerViewModel viewModel);
        TResult Upload(UploadBlobViewModel viewModel);
        TResult UploadStream(UploadBlobViewModel viewModel);
        IList<BlobViewModel> List(ListBlobsViewModel viewModel);
        TResult Download(DownloadBlobViewModel viewModel);
        TResult Delete(DeleteBlobViewModel viewModel);

        IImage HandleMedia(ImageViewModel mediaViewModel, IImage existingMedia, bool urlChanged);
        IImage HandleMedia(ImageViewModel mediaViewModel, IImage existingMedia);

        byte[] CropImage(byte[] imageInByte, ImageCropInfoViewModel cropInfo);
        byte[] CropImage(byte[] imageInByte, ImageCropInfoViewModel cropInfo, String formatName);

        void FromBase64ToUrl(ImageViewModel viewModel);
        TResult TryDeleteBlob(VehicleImageFileToDeleteViewModel viewModel);
    }
}