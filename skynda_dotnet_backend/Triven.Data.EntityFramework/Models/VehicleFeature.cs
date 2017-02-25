using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleFeature")]
    public class VehicleFeature : AuditableModel, IVehicleFeature
    {
        [Key]
        [ForeignKey("Feature")]
        public int FeatureId { get; set; }   
        public Feature Feature { get; set; }

        [Key]
        [ForeignKey("Vehicle")]
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}