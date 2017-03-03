using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleImage")]
    public class VehicleImage : AuditableModel, IVehicleImage
    {
        [Required]
        public Vehicle Vehicle { get; set; }
        [Required]
        public Image Image { get; set; }
    }
}