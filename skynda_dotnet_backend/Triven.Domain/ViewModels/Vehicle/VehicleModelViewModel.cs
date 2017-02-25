using Triven.Domain.ViewModels.Classification;
using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleModelViewModel : BaseModel
    {
        public string ModelCode { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public string Engine { get; set; }
        public int HorsePower { get; set; }
        public int Doors { get; set; }
        public int Seats { get; set; }
        public int Year { get; set; }
        public ClassificationModel VehicleManufacturer { get; set; }
        public ClassificationModel Transmission { get; set; }
        public ClassificationModel Drivetrain { get; set; }
        public ClassificationModel VehicleBody { get; set; }
        public ClassificationModel FuelType { get; set; }
    }
}