using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleFeature")]
    public class VehicleFeature : AuditableModel, IVehicleFeature
    {
        public int FeatureId { get; set; }
        public virtual Feature Feature { get; set; }

        public int VehicleId { get; set; }
        public virtual Vehicle Vehicle { get; set; }
    }
}