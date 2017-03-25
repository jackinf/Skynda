﻿using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleReportItem")]
    public class VehicleReportItem : AuditableModel, IVehicleReportItem
    {
        public bool IsPass { get; set; }

        public string Title { get; set; }

        public string Text { get; set; }

        public int ParentId { get; set; }
        public virtual VehicleReport Parent { get; set; }
    }
}