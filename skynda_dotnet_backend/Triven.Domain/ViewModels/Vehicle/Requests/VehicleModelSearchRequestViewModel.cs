using System.Collections.Generic;

namespace Triven.Domain.ViewModels.Vehicle.Requests
{
    public class VehicleModelSearchRequestViewModel
    {
        public List<int> ManufacturerIds { get; set; } = new List<int>();
    }
}