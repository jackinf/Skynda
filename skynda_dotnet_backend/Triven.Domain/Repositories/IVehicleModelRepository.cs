﻿using System;
using System.Collections.Generic;
using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;
using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Vehicle.Requests;

namespace Triven.Domain.Repositories
{
    public interface IVehicleModelRepository<TVehicleModel> : IBaseCrudRepository<TVehicleModel>
        where TVehicleModel : IVehicleModel
    {
        TVehicleModel GetByModelCode(String vehicleModelCode);
        IList<TVehicleModel> Search(VehicleModelSearchRequestViewModel parameters);
        void DeleteEntity(TVehicleModel model, DeleteResponseViewModel response);
        List<TVehicleModel> GetAll(bool isActive = true);
    }
}