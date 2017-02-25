﻿using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    public class VehicleFault : AuditableModel, IVehicleFault
    {
        public string Text { get; set; }
        public int ImageId { get; set; }
        public int ReportCategoryId { get; set; }
    }
}