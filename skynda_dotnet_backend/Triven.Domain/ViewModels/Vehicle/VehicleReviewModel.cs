using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Image;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleReviewModel : BaseModel
    {
        public int VehicleId { get; set; }
        public ImageModel Logo { get; set; }
        public ImageModel Video { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public bool IsModal { get; set; }
    }
}