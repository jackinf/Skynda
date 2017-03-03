using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleReport")]
    public class VehicleReport : AuditableModel, IVehicleReport
    {
        public string Title { get; set; }
        public string Description { get; set; }

        [Required]
        public Vehicle Vehicle { get; set; }

        public string Inspector { get; set; }

        [InverseProperty(nameof(VehicleReportItem.Parent))]
        public List<VehicleReportItem> VehicleReportItems { get; set; } = new List<VehicleReportItem>();

        [InverseProperty(nameof(VehicleFault.VehicleReport))]
        public List<VehicleFault> Faults { get; set; } = new List<VehicleFault>();
    }
}