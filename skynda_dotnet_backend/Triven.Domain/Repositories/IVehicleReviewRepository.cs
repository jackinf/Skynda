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
        void DeleteEntity(TVehicleReviewEntity review, DeleteResponseViewModel response);
        TVehicleReviewEntity Get(int id, bool isActive = true);
        IList<TVehicleReviewEntity> GetAll(bool isActive = true);
        IList GetAllBy(int vehicleId);
        IList GetAllBy(int vehicleId, bool isActive);
        TVehicleReviewEntity SaveOrUpdate(TVehicleReviewEntity vehicleReview);
    }
}