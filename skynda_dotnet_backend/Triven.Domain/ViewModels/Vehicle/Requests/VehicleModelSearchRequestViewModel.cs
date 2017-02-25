using System.Collections.Generic;

namespace Triven.Domain.ViewModels.Vehicle.Requests
{
    public class VehicleModelSearchRequestModel
    {
        public IList<int> ManufacturerIds { get; set; }
    }
}