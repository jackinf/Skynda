using System.Collections.Generic;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleReviewRepository : BaseCrudRepository<VehicleReview>, IVehicleReviewRepository<VehicleReview>
    {
        public List<VehicleReview> GetAllBy(int vehicleId) => BaseQuery().Where(x => x.VehicleId == vehicleId).ToList();
        public List<VehicleReview> GetAllBy(int vehicleId, bool isActive) => BaseQuery().Where(x => x.VehicleId == vehicleId).ToList();
    }
}