using System.Collections.Generic;
using Triven.Domain.ViewModels.Classification;

namespace Triven.Domain.ViewModels.Vehicle.Requests
{
    public class SearchRequestModel
    {
        public IList<ButtonAttributesModel> Models { get; set; }
        public IList<ButtonAttributesModel> Brands { get; set; }
        public IList<ButtonAttributesModel> Colors { get; set; }
        public IList<ButtonAttributesModel> Features { get; set; }
        public IList<ButtonAttributesModel> Doors { get; set; }
        public IList<ButtonAttributesModel> Seats { get; set; }
        public IList<ButtonAttributesModel> Transmission { get; set; }
        public IList<ButtonAttributesModel> FuelType { get; set; }
        public SliderAttributesModel Mileage { get; set; }
        public SliderAttributesModel Price { get; set; }
        public SliderAttributesModel Year { get; set; }
        public SliderAttributesModel PetrolConsumption { get; set; }
        public SliderAttributesModel Power { get; set; }
    }
}