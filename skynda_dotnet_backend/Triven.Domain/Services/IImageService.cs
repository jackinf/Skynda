using System.Collections.Generic;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Image;

namespace Triven.Domain.Services
{
    public interface IImageService
    {
        ServiceResult<IList<ImageViewModel>> List(string containerName);
    }
}