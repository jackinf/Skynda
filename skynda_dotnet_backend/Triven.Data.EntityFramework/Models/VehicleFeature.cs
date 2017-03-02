using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleFeature")]
    public class VehicleFeature : AuditableModel, IVehicleFeature
    {
        [Required]
        public IFeature Feature { get; set; }
        [Required]
        public IVehicle Vehicle { get; set; }
    }
}