using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleFeature")]
    public class VehicleFeature : AuditableModel, IVehicleFeature
    {
        [Column(Order = 0), Key, ForeignKey(nameof(Feature))]
        public int FeatureId { get; set; }   
        public Feature Feature { get; set; }

        [Column(Order = 1), Key, ForeignKey(nameof(Vehicle))]
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}