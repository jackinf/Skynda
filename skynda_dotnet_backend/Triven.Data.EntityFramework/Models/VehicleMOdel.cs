using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    public class VehicleModel : AuditableModel, IVehicleModel
    {
        public string ModelCode { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public string Engine { get; set; }
        public int HorsePower { get; set; }
        public int Doors { get; set; }
        public int Seats { get; set; }
        public int Year { get; set; }

        [Required]
        [ForeignKey("VehicleManufacturer")]
        public int VehicleManufacturerId { get; set; }
        public virtual Classification VehicleManufacturer { get; set; }

        [Required]
        [ForeignKey("Transmission")]
        public int TransmissionId { get; set; }
        public virtual Classification Transmission { get; set; }

        [Required]
        [ForeignKey("Drivetrain")]
        public int DrivetrainId { get; set; }
        public virtual Classification Drivetrain { get; set; }

        [Required]
        [ForeignKey("VehicleBody")]
        public int VehicleBodyId { get; set; }
        public virtual Classification VehicleBody { get; set; }

        [Required]
        [ForeignKey("FuelType")]
        public int FuelTypeId { get; set; }
        public virtual Classification FuelType { get; set; }
    }
}