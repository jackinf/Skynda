using System.Collections.Generic;
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

        public string Inspector { get; set; }

        public int VehicleId { get; set; }
        public virtual Vehicle Vehicle { get; set; }

        [InverseProperty(nameof(VehicleReportItem.Parent))]
        public List<VehicleReportItem> VehicleReportItems { get; set; } = new List<VehicleReportItem>();

        [InverseProperty(nameof(VehicleFault.VehicleReport))]
        public List<VehicleFault> Faults { get; set; } = new List<VehicleFault>();

    }
}