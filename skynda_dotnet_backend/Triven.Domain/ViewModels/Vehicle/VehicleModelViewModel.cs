using Triven.Domain.ViewModels.Classification;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleModelViewModel : BaseViewModel
    {
        public string ModelCode { get; set; }
        public string Description { get; set; }
        public int Doors { get; set; }
        public int Seats { get; set; }
        public int VehicleManufacturerId { get; set; }
        public int DrivetrainId { get; set; }
        public int VehicleBodyId { get; set; }
        public string DisplayName { get; set; }
    }
}