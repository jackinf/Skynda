using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleFault")]
    public class VehicleFault : AuditableModel, IVehicleFault
    {
        public string Text { get; set; }
        public Image Image { get; set; }        
        public VehicleReport VehicleReport { get; set; }
    }
}