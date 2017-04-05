using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IVehicleModel : IAuditableBaseModel
    {
        string ModelCode { get; set; }
        string Description { get; set; }
        int Doors { get; set; }
        int Seats { get; set; }
    }
}