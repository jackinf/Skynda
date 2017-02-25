using System.Collections.Generic;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Models;
using Triven.Domain.Repositories;
using Triven.Domain.ViewModels.Image;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleImageRepository : BaseCrudRepository<VehicleImage>, IVehicleImageRepository<VehicleImage>
    {
        public void AddMultipleToVehicle(IVehicle vehicle, IList<ImageContainerViewModel> images)
        {
            throw new System.NotImplementedException();
        }
    }
}