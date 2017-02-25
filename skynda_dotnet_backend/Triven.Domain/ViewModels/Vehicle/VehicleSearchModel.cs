using Triven.Domain.ViewModels.Image;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleSearchModel 
    {
        public VehicleModelViewModel Model { get; set; }
        public decimal Price { get; set; }
        public decimal Mileage { get; set; }
        public string Comment { get; set; }
        public ImageModel MainImage { get; set; }
    }
}