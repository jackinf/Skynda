using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    public class VehicleFeature : AuditableModel, IVehicleFeature
    {
        public int FeatureId { get; set; }
        public int VehicleId { get; set; }
    }
}