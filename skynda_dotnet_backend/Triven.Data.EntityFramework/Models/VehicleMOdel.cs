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

        public string ModelCode { get; set; }

        public string Engine { get; set; }

        public int Year { get; set; }   

        /// <summary>
        /// Manufacturer
        /// </summary>
        public Classification VehicleManufacturer { get; set; }

        /// <summary>
        /// Transmission
        /// </summary>
        public Classification Transmission { get; set; }

        /// <summary>
        /// Drivetrain
        /// </summary>
        public Classification Drivetrain { get; set; }

        /// <summary>
        /// VehicleBody
        /// </summary>
        public Classification VehicleBody { get; set; }

        /// <summary>
        /// Fuel
        /// </summary>
        public Classification FuelType { get; set; }
    }
}