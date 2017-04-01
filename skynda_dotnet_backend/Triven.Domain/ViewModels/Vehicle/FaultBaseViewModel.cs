using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Image;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class FaultBaseViewModel : BaseViewModel
    {
        public string Text { get; set; }
        public ImageViewModel Image { get; set; }
        public int VehicleReportId { get; set; }
    }
}