using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleReportItemModel : BaseModel
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public bool IsPass { get; set; }
        public int ParentId { get; set; }
    }
}