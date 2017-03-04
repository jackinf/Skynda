using System.Collections.Generic;
using AutoMapper;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Results;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Image;

namespace Triven.Application.Services
{
    public class ImageService : IImageService
    {
        private readonly IImageRepository<Image> _imageRepository;

        public ImageService()
        {
            _imageRepository = IoC.Get<IImageRepository<Image>>();
        }

        public ServiceResult<IList<ImageViewModel>> List(string containerName)
        {
            var result = _imageRepository.GetAllBy(containerName);
            IList<ImageViewModel> viewModels = Mapper.Map<IList<Image>, IList<ImageViewModel>>(result);
            return ServiceResult<IList<ImageViewModel>>.Factory.Success(viewModels);
        }
    }
}