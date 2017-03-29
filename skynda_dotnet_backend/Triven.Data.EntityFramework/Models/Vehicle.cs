using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.Enums;
using Triven.Domain.Helpers;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("Vehicle")]
    public class Vehicle : AuditableModel, IVehicle
    {
        public string VinCode { get; set; }

        public decimal Price { get; set; }

        public string RegistrationNumber { get; set; }

        public decimal Mileage { get; set; }

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

        [Column("VehicleStatus")]
        public string VehicleStatusString
        {
            get => VehicleStatus.ToString();
            private set => VehicleStatus = value.ParseEnum<VehicleStatus>();
        }

        [NotMapped]
        public VehicleStatus VehicleStatus { get; set; }

        /// <summary>
        /// Application user
        /// </summary>
        public int? ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        /// <summary>
        /// Main image
        /// </summary>
        public int MainImageId { get; set; }
        public Image MainImage { get; set; }

        /// <summary>
        /// Vehicle VehicleModel
        /// </summary>
        public int VehicleModelId { get; set; }
        public VehicleModel VehicleModel { get; set; }

        /// <summary>
        /// Vehicle images
        /// </summary>
        [InverseProperty(nameof(VehicleImage.Vehicle))]
        public IList<VehicleImage> Images { get; set; } = new List<VehicleImage>();

        /// <summary>
        /// Vehicle descriptions
        /// </summary>
        [InverseProperty(nameof(VehicleDescription.Vehicle))]
        public IList<VehicleDescription> Descriptions { get; set; } = new List<VehicleDescription>();

        /// <summary>
        /// Vehicle features
        /// </summary>
        [InverseProperty(nameof(VehicleFeature.Vehicle))]
        public IList<VehicleFeature> Features { get; set; } = new List<VehicleFeature>();

        /// <summary>
        /// Vehicle features
        /// </summary>
        [InverseProperty(nameof(VehicleReport.Vehicle))]
        public IList<VehicleReport> Reports { get; set; } = new List<VehicleReport>();

        /// <summary>
        /// Vehicle features
        /// </summary>
        [InverseProperty(nameof(VehicleReview.Vehicle))]
        public IList<VehicleReview> Reviews { get; set; } = new List<VehicleReview>();
    }
}