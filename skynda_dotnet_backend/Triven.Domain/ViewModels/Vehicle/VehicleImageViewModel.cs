using Triven.Domain.Models;
using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Image;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleImageViewModel : BaseViewModel
    {
        public VehicleAdminViewModel Vehicle { get; set; }
        public ImageViewModel Image { get; set; }
    }
}