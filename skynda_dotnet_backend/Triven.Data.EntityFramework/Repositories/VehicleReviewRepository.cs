using System.Collections;
using System.Collections.Generic;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;
using Triven.Domain.ViewModels.Common;

namespace Triven.Data.EntityFramework.Repositories
{
    public class VehicleReviewRepository : BaseCrudRepository<VehicleReview>, IVehicleReviewRepository<VehicleReview>
    {
        public void DeleteEntity(VehicleReview review, DeleteResponseViewModel response)
        {
            throw new System.NotImplementedException();
        }

        public VehicleReview Get(int id, bool isActive = true)
        {
            throw new System.NotImplementedException();
        }

        public IList<VehicleReview> GetAll(bool isActive = true)
        {
            throw new System.NotImplementedException();
        }

        public IList GetAllBy(int vehicleId)
        {
            throw new System.NotImplementedException();
        }

        public IList GetAllBy(int vehicleId, bool isActive)
        {
            throw new System.NotImplementedException();
        }

        public VehicleReview SaveOrUpdate(VehicleReview vehicleReview)
        {
            throw new System.NotImplementedException();
        }
    }
}