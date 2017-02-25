﻿using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories
{
    public interface IImageRepository<TImageEntity> : IBaseCrudRepository<TImageEntity>
        where TImageEntity : IImage
    {
        
    }
}