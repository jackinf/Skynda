using Triven.Domain.ViewModels.Image;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleSearchViewModel 
    {
        public VehicleModelViewModel Model { get; set; }
        public decimal Price { get; set; }
        public decimal Mileage { get; set; }
        public string Comment { get; set; }
        public ImageViewModel MainImage { get; set; }
    }
}