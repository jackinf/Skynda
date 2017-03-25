using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleCompactViewModel : BaseViewModel
    {
        public string ThumbnailUrl { get; set; }
        public decimal Price { get; set; }
        public decimal Mileage { get; set; }
        public string Comment { get; set; }
        public string VehicleManufacturerName { get; set; }
        public int ModelHorsePower { get; set; }
        public int ModelDoors { get; set; }
        public int ModelSeats { get; set; }
        public int ModelYear { get; set; }
    }
}