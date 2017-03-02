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
        public IVehicle Vehicle { get; set; }

        public string Inspector { get; set; }

        [InverseProperty(nameof(VehicleReportItem.Parent))]
        public List<IVehicleReportItem> VehicleReportItems { get; set; } = new List<IVehicleReportItem>();

        [InverseProperty(nameof(VehicleFault.VehicleReport))]
        public List<IVehicleFault> Faults { get; set; } = new List<IVehicleFault>();
    }
}