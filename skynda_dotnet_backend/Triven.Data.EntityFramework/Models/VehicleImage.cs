using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    public class VehicleImage : AuditableModel, IVehicleImage
    {
        [ForeignKey("Vehicle")]
        public int VehicleId { get; set; }

        public virtual Vehicle Vehicle { get; set; }

        [ForeignKey("Image")]
        public int ImageId { get; set; }

        public virtual Image Image { get; set; }
    }
}