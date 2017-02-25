using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Image;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class FaultBaseModel : BaseModel
    {
        public string Text { get; set; }
        public ImageModel Image { get; set; }
        public int ReportCategoryId { get; set; }
    }
}