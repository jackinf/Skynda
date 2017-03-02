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
        IClassification VehicleManufacturer { get; set; }
        IClassification Transmission { get; set; }
        IClassification Drivetrain { get; set; }
        IClassification VehicleBody { get; set; }
        IClassification FuelType { get; set; }

    }
}