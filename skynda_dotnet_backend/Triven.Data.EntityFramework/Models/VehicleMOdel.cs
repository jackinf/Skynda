using System.ComponentModel.DataAnnotations;
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

        [Required]
        public string ModelCode { get; set; }

        [Required]
        public string Engine { get; set; }

        [Required]
        public int Year { get; set; }   

        /// <summary>
        /// Manufacturer
        /// </summary>
        [ForeignKey("VehicleManufacturer")]
        public int VehicleManufacturerId { get; set; }
        [Required]
        public virtual Classification VehicleManufacturer { get; set; }

        /// <summary>
        /// Transmission
        /// </summary>
        [ForeignKey("Transmission")]
        public int TransmissionId { get; set; }
        [Required]
        public virtual Classification Transmission { get; set; }

        /// <summary>
        /// Drivetrain
        /// </summary>
        [ForeignKey("Drivetrain")]
        public int DrivetrainId { get; set; }
        [Required]
        public virtual Classification Drivetrain { get; set; }

        /// <summary>
        /// VehicleBody
        /// </summary>
        [ForeignKey("VehicleBody")]
        public int VehicleBodyId { get; set; }
        [Required]
        public virtual Classification VehicleBody { get; set; }

        /// <summary>
        /// Fuel
        /// </summary>
        [ForeignKey(nameof(FuelType))]
        public int FuelTypeId { get; set; }
        [Required]
        public virtual Classification FuelType { get; set; }
    }
}