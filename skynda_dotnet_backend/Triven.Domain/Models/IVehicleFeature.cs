using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IVehicleFeature : IAuditableBaseModel
    {
        IFeature Feature { get; set; }
        IVehicle Vehicle { get; set; }
    }
}