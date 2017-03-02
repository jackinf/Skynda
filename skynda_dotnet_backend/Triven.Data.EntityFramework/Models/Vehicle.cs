using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
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
        [Required]
        public IApplicationUser ApplicationUser { get; set; }

        /// <summary>
        /// Main image
        /// </summary>
        [Required]
        public IImage MainImage { get; set; }

        /// <summary>
        /// Vehicle Model
        /// </summary>
        [Required]
        public IVehicleModel VehicleModel { get; set; }

        /// <summary>
        /// Vehicle images
        /// </summary>
        [InverseProperty(nameof(VehicleImage.Vehicle))]
        public IList<IVehicleImage> Images { get; set; } = new List<IVehicleImage>();

        /// <summary>
        /// Vehicle descriptions
        /// </summary>
        [InverseProperty(nameof(VehicleDescription.Vehicle))]
        public IList<IVehicleDescription> Descriptions { get; set; } = new List<IVehicleDescription>();

        /// <summary>
        /// Vehicle features
        /// </summary>
        [InverseProperty(nameof(VehicleFeature.Vehicle))]
        public IList<IVehicleFeature> Features { get; set; } = new List<IVehicleFeature>();

        /// <summary>
        /// Vehicle features
        /// </summary>
        [InverseProperty(nameof(VehicleReport.Vehicle))]
        public IList<IVehicleReport> Reports { get; set; } = new List<IVehicleReport>();

        /// <summary>
        /// Vehicle features
        /// </summary>
        [InverseProperty(nameof(VehicleReview.Vehicle))]
        public IList<IVehicleReview> Reviews { get; set; } = new List<IVehicleReview>();
    }
}