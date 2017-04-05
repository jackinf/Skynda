using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Entities.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Entities
{
    [Table("VehicleImage")]
    public class VehicleImage : AuditableModel, IVehicleImage
    {
        public int VehicleId { get; set; }
        public virtual Vehicle Vehicle { get; set; }

        public int ImageId { get; set; }
        public Image Image { get; set; }
    }
}