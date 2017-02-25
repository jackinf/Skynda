using Triven.Domain.ViewModels.Common;

namespace Triven.Domain.ViewModels.Vehicle.Reponses
{
    public class VehicleModelResponseViewModel : BaseViewModel
    {
        public string VehicleManufacturerCode { get; set; }
        public string ModelCode { get; set; }
        public string Title { get; set; }
    }
}