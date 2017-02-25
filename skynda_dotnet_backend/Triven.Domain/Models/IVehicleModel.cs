using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IVehicleModel : IAuditableBaseModel
    {
        string ModelCode { get; set; }
        string Description { get; set; }
        string Title { get; set; }
        string Engine { get; set; }
        int HorsePower { get; set; }
        int Doors { get; set; }
        int Seats { get; set; }
        int Year { get; set; }
        int VehicleManufacturerId { get; set; }
        int TransmissionId { get; set; }
        int DrivetrainId { get; set; }
        int VehicleBodyId { get; set; }
        int FuelTypeId { get; set; }

    }
}