using System;
using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.Results;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Domain.Repositories
{
    public interface IVehicleModelRepository<TVehicleModel> : IBaseCrudRepository<TVehicleModel>
        where TVehicleModel : IVehicleModel
    {
        TVehicleModel GetByModelCode(String vehicleModelCode);
        IList<TVehicleModel> Search(VehicleModelSearchRequestViewModel parameters);

        TVehicleModel GetFullVehicleModel(int id);

        IResult<TVehicleModel> Add(TVehicleModel model);

        IResult<TVehicleModel> Update(int id, TVehicleModel model);
    }
}