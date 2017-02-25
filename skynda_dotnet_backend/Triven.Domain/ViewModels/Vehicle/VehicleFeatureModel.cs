using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Feature;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleFeatureModel : BaseModel
    {
        public int VehicleId { get; set; }
        public FeatureModel Feature { get; set; }
    }
}