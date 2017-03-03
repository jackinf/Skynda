using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IVehicleReportItem : IAuditableBaseModel
    {
        bool IsPass { get; set; }
        string Title { get; set; }
        string Text { get; set; }
    }
}