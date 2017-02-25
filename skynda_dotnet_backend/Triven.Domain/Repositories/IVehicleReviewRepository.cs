using System.Collections;
using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.Repositories
{
    public interface IVehicleReviewRepository<TVehicleReviewEntity> : IBaseCrudRepository<TVehicleReviewEntity>
        where TVehicleReviewEntity : IVehicleReview
    {
        List<TVehicleReviewEntity> GetAllBy(int vehicleId);
        List<TVehicleReviewEntity> GetAllBy(int vehicleId, bool isActive);
    }
}