using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleDescriptionViewModel : BaseViewModel
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public int VehicleId { get; set; }
    }
}