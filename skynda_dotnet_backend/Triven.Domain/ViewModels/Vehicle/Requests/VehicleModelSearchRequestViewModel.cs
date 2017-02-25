using System.Collections.Generic;

namespace Triven.Domain.ViewModels.Vehicle.Requests
{
    public class VehicleModelSearchRequestViewModel
    {
        public IList<int> ManufacturerIds { get; set; }
    }
}