using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IVehicleImage : IAuditableBaseModel
    {
        IVehicle Vehicle { get; set; }
        IImage Image { get; set; }
    }
}