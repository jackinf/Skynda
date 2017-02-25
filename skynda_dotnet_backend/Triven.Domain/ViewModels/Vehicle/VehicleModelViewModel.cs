using Triven.Domain.ViewModels.Classification;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleModelViewModel : BaseViewModel
    {
        public string ModelCode { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public string Engine { get; set; }
        public int HorsePower { get; set; }
        public int Doors { get; set; }
        public int Seats { get; set; }
        public int Year { get; set; }
        public ClassificationViewModel VehicleManufacturer { get; set; }
        public ClassificationViewModel Transmission { get; set; }
        public ClassificationViewModel Drivetrain { get; set; }
        public ClassificationViewModel VehicleBody { get; set; }
        public ClassificationViewModel FuelType { get; set; }
    }
}