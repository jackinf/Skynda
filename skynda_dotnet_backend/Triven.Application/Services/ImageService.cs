using System.Collections.Generic;
using AutoMapper;
using Triven.Application.Results;
using Triven.Data.EntityFramework.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Image;

namespace Triven.Application.Services
{
    public class ImageService : IImageService<ServiceResult>
    {
        private readonly IImageRepository<Image> _imageRepository;

        public ImageService()
        {
            _imageRepository = IoC.Get<IImageRepository<Image>>();
        }

        public ServiceResult List(string containerName)
        {
            var result = _imageRepository.GetAllBy(containerName);
            var viewModels = Mapper.Map<IList<Image>, IList<ImageViewModel>>(result);
            return ServiceResult.Factory.Success(viewModels);
        }
    }
}