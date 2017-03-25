using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleImage")]
    public class VehicleImage : AuditableModel, IVehicleImage
    {
        public int VehicleId { get; set; }
        public virtual Vehicle Vehicle { get; set; }

        public int ImageId { get; set; }
        public virtual Image Image { get; set; }
    }
}