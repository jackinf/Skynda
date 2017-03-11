using System.Collections.Generic;
using System.Linq;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleReviewRepository : BaseCrudRepository<VehicleReview>, IVehicleReviewRepository<VehicleReview>
    {
        public List<VehicleReview> GetAllBy(int vehicleId)
        {
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context).Where(x => x.Vehicle.Id == vehicleId).ToList();
            }
        }

        public List<VehicleReview> GetAllBy(int vehicleId, bool isActive)
        {
            using (var context = new ApplicationDbContext())
            {
                return BaseQuery(context).Where(x => x.Vehicle.Id == vehicleId).ToList();
            }
        }
    }
}