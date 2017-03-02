using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IVehicleFault : IAuditableBaseModel
    {
        string Text { get; set; }
        IImage Image { get; set; }
        IVehicleReport VehicleReport { get; set; }
    }
}