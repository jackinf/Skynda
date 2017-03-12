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

        public int VehicleManufacturerId { get; set; }
        public int TransmissionId { get; set; }
        public int DrivetrainId { get; set; }
        public int VehicleBodyId { get; set; }
        public int FuelTypeId { get; set; }
    }
}