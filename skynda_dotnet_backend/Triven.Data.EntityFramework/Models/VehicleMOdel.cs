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
        [Required]
        public Classification VehicleManufacturer { get; set; }

        /// <summary>
        /// Transmission
        /// </summary>
        [Required]
        public Classification Transmission { get; set; }

        /// <summary>
        /// Drivetrain
        /// </summary>
        [Required]
        public Classification Drivetrain { get; set; }

        /// <summary>
        /// VehicleBody
        /// </summary>
        [Required]
        public Classification VehicleBody { get; set; }

        /// <summary>
        /// Fuel
        /// </summary>
        [Required]
        public Classification FuelType { get; set; }
    }
}