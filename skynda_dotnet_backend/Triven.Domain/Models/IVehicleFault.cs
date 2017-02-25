using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IVehicleFault : IAuditableBaseModel
    {
        string Text { get; set; }
        int ImageId { get; set; }
        int ReportCategoryId { get; set; }

    }
}