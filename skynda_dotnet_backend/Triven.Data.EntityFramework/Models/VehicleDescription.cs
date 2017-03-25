using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleDescription")]
    public class VehicleDescription : AuditableModel, IVehicleDescription
    {
        public string Title { get; set; }
        public string Content { get; set; }

        /// <summary>
        /// Vehicle 
        /// </summary>        
        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; } = new Vehicle();
    }
}