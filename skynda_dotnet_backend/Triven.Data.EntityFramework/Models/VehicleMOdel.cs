using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleModel")]
    public class VehicleModel : AuditableModel, IVehicleModel
    {
        public string Description { get; set; }

        public string Title { get; set; }

        public int HorsePower { get; set; }

        public int Doors { get; set; }

        public int Seats { get; set; }

        public string ModelCode { get; set; }

        public string Engine { get; set; }

        public int Year { get; set; }   

        /// <summary>
        /// Manufacturer
        /// </summary>
        public int VehicleManufacturerId { get; set; }
        public virtual Classification VehicleManufacturer { get; set; }

        /// <summary>
        /// Transmission
        /// </summary>
        public int TransmissionId { get; set; }
        public virtual Classification Transmission { get; set; }

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

        /// <summary>
        /// Fuel
        /// </summary>
        public int FuelTypeId { get; set; }
        public virtual Classification FuelType { get; set; }
    }
}