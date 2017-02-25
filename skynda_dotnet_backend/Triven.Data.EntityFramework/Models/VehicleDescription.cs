using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    public class VehicleDescription : AuditableModel, IVehicleDescription
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int VehicleId { get; set; }
    }
}