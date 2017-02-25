using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.ViewModels.Image;

namespace Triven.Domain.Repositories
{
    public interface IVehicleImageRepository<TVehicleImageEntity> : IBaseCrudRepository<TVehicleImageEntity>
        where TVehicleImageEntity : IVehicleImage
    {
        void AddMultipleToVehicle(IVehicle vehicle, IList<ImageContainerViewModel> images);
    }
}