using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IVehicleDescription : IAuditableBaseModel
    {
        string Title { get; set; }
        string Content { get; set; }
        int VehicleId { get; set; }
    }
}