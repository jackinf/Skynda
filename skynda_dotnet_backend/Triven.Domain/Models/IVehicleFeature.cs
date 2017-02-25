using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IVehicleFeature : IAuditableBaseModel
    {
        int FeatureId { get; set; }
        int VehicleId { get; set; }
    }
}