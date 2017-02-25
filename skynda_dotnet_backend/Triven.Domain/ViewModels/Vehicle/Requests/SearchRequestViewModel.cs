using System.Collections.Generic;
using Triven.Domain.ViewModels.Classification;

namespace Triven.Domain.ViewModels.Vehicle.Requests
{
    public class SearchRequestViewModel
    {
        public IList<ButtonAttributesViewModel> Models { get; set; }
        public IList<ButtonAttributesViewModel> Brands { get; set; }
        public IList<ButtonAttributesViewModel> Colors { get; set; }
        public IList<ButtonAttributesViewModel> Features { get; set; }
        public IList<ButtonAttributesViewModel> Doors { get; set; }
        public IList<ButtonAttributesViewModel> Seats { get; set; }
        public IList<ButtonAttributesViewModel> Transmission { get; set; }
        public IList<ButtonAttributesViewModel> FuelType { get; set; }
        public SliderAttributesViewModel Mileage { get; set; }
        public SliderAttributesViewModel Price { get; set; }
        public SliderAttributesViewModel Year { get; set; }
        public SliderAttributesViewModel PetrolConsumption { get; set; }
        public SliderAttributesViewModel Power { get; set; }
    }
}