using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleImage")]
    public class VehicleImage : AuditableModel, IVehicleImage
    {
        [Key]
        [ForeignKey("Vehicle")]
        public int VehicleId { get; set; }

        public virtual Vehicle Vehicle { get; set; }

        [Key]
        [ForeignKey("Image")]
        public int ImageId { get; set; }

        [Required]
        public virtual Image Image { get; set; }
    }
}