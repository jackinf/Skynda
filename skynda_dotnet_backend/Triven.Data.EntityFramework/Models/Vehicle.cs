using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("Vehicle")]
    public class Vehicle : AuditableModel, IVehicle
    {
        [Required]
        public string VinCode { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public string RegistrationNumber { get; set; }

        [Required]
        public decimal Mileage { get; set; }

        [Required]
        public string ColorOutsideHex { get; set; }
        
        public string ColorInsideHex { get; set; }

        public decimal FuelCity { get; set; }

        public decimal FuelHighway { get; set; }

        public string Problems { get; set; }

        public int CompressionRatio { get; set; }

        public string CompressionType { get; set; }

        public string Configuration { get; set; }

        public string Cylinders { get; set; }

        public string Displacement { get; set; }

        public int Size { get; set; }

        public int Torque { get; set; }

        public int TotalValves { get; set; }

        public int Safetystars { get; set; }

        public string SafetyUrl { get; set; }

        public string Additional { get; set; }

        /// <summary>
        /// Application user
        /// </summary>
        [ForeignKey("ApplicationUser")]
        public int OwnerId { get; set; }
        [Required]
        public ApplicationUser ApplicationUser { get; set; }

        /// <summary>
        /// Main image
        /// </summary>
        [ForeignKey("MainImage")]
        public int MainImageId { get; set; }
        [Required]
        public Image MainImage { get; set; }

        /// <summary>
        /// Vehicle Model
        /// </summary>
        [ForeignKey("VehicleModel")]
        public int ModelId { get; set; }
        [Required]
        public VehicleModel VehicleModel { get; set; }

        /// <summary>
        /// Vehicle images
        /// </summary>
        [InverseProperty("Vehicle")]
        public IList<VehicleImage> Images { get; set; } = new List<VehicleImage>();

        /// <summary>
        /// Vehicle descriptions
        /// </summary>
        [InverseProperty("Vehicle")]
        public IList<VehicleDescription> Descriptions { get; set; } = new List<VehicleDescription>();

        /// <summary>
        /// Vehicle features
        /// </summary>
        [InverseProperty("Vehicle")]
        public IList<VehicleFeature> Features { get; set; } = new List<VehicleFeature>();

        /// <summary>
        /// Vehicle features
        /// </summary>
        [InverseProperty("Vehicle")]
        public IList<VehicleReport> Reports { get; set; } = new List<VehicleReport>();

        /// <summary>
        /// Vehicle features
        /// </summary>
        [InverseProperty("Vehicle")]
        public IList<VehicleReview> Reviews { get; set; } = new List<VehicleReview>();
    }
}