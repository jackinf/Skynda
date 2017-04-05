using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Entities.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Entities
{
    [Table("VehicleModel")]
    public class VehicleModel : AuditableModel, IVehicleModel
    {
        public string Description { get; set; }

        public int Doors { get; set; }

        public int Seats { get; set; }

        public string ModelCode { get; set; } 

        /// <summary>
        /// Manufacturer
        /// </summary>
        public int VehicleManufacturerId { get; set; }
        public virtual Classification VehicleManufacturer { get; set; }

        /// <summary>
        /// Drivetrain
        /// </summary>
        public int DrivetrainId { get; set; }
        public virtual Classification Drivetrain { get; set; }

        /// <summary>
        /// VehicleBody
        /// </summary>
        public int VehicleBodyId { get; set; }
        public virtual Classification VehicleBody { get; set; }


    }
}