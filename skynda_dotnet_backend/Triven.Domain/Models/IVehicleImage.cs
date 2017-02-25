using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IVehicleImage : IAuditableBaseModel
    {
        int VehicleId { get; set; }
        int ImageId { get; set; }
    }
}