using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Feature;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleFeatureViewModel : BaseViewModel
    {
        public int VehicleId { get; set; }
        public FeatureViewModel Feature { get; set; }
    }
}