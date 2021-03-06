﻿using System.Collections.Generic;
using Triven.Domain.ViewModels.Classification;

namespace Triven.Domain.ViewModels.Vehicle.Requests
{
    public class SearchRequestViewModel
    {
        public IList<ButtonAttributesViewModel> Models { get; set; } = new List<ButtonAttributesViewModel>();
        public IList<ButtonAttributesViewModel> Brands { get; set; } = new List<ButtonAttributesViewModel>();
        public IList<ButtonAttributesViewModel> Colors { get; set; } = new List<ButtonAttributesViewModel>();
        public IList<ButtonAttributesViewModel> Features { get; set; } = new List<ButtonAttributesViewModel>();
        public IList<ButtonAttributesViewModel> Doors { get; set; } = new List<ButtonAttributesViewModel>();
        public IList<ButtonAttributesViewModel> Seats { get; set; } = new List<ButtonAttributesViewModel>();
        public IList<ButtonAttributesViewModel> Transmission { get; set; } = new List<ButtonAttributesViewModel>();
        public IList<ButtonAttributesViewModel> FuelType { get; set; } = new List<ButtonAttributesViewModel>();
        public SliderAttributesViewModel Mileage { get; set; }
        public SliderAttributesViewModel Price { get; set; }
        public SliderAttributesViewModel Year { get; set; }
        public SliderAttributesViewModel PetrolConsumption { get; set; }
        public SliderAttributesViewModel Power { get; set; }
    }
}