using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleFeature")]
    public class VehicleFeature : AuditableModel, IVehicleFeature
    {
        public Feature Feature { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}