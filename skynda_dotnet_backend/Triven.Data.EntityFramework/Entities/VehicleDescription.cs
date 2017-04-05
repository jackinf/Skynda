using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Entities.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Entities
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
        public virtual Vehicle Vehicle { get; set; }
    }
}