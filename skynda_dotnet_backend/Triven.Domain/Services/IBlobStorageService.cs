﻿using System;
using System.Collections.Generic;
using System.IO;
using Triven.Domain.Models;
using Triven.Domain.Results;
using Triven.Domain.UnitOfWorks;
using Triven.Domain.ViewModels.BlobStorage;
using Triven.Domain.ViewModels.Image;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Domain.Services
{
    public interface IBlobStorageService
    {
        ServiceResult<bool> CreateContainer(CreateContainerViewModel viewModel);
        ServiceResult<bool> DeleteContainer(DeleteContainerViewModel viewModel);
        ServiceResult<Uri> Upload(UploadBlobViewModel viewModel);
        ServiceResult<List<string>> List(ListBlobsViewModel viewModel);
        ServiceResult<MemoryStream> Download(DownloadBlobViewModel viewModel);
        ServiceResult<bool> Delete(DeleteBlobViewModel viewModel);

        IImage HandleMedia(ImageViewModel mediaViewModel, IImage existingMedia, IDbContext context = null);

        void HandleMediaCollection(int vehicleId, IList<VehicleImageViewModel> mediaViewModel, IList<VehicleImageViewModel> existingMedia, IDbContext context = null);
    }
}