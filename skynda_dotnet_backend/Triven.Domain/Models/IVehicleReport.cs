using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IVehicleReport : IAuditableBaseModel
    {
        string Title { get; set; }
        string Description { get; set; }
        int VehicleId { get; set; }
        string Inspector { get; set; }
    }
}