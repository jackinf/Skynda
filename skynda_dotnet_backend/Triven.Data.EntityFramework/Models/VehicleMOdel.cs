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
        public IClassification VehicleManufacturer { get; set; }

        /// <summary>
        /// Transmission
        /// </summary>
        [Required]
        public IClassification Transmission { get; set; }

        /// <summary>
        /// Drivetrain
        /// </summary>
        [Required]
        public IClassification Drivetrain { get; set; }

        /// <summary>
        /// VehicleBody
        /// </summary>
        [Required]
        public IClassification VehicleBody { get; set; }

        /// <summary>
        /// Fuel
        /// </summary>
        [Required]
        public IClassification FuelType { get; set; }
    }
}