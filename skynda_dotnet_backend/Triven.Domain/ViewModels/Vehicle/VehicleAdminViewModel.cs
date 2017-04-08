using System.Collections.Generic;
using Triven.Domain.ViewModels.Common;
using Triven.Domain.ViewModels.Feature;
using Triven.Domain.ViewModels.Image;

namespace Triven.Domain.ViewModels.Vehicle
{
    public class VehicleAdminViewModel : BaseViewModel
    {
        public string VinCode { get; set; }
        public decimal Price { get; set; }
        public string RegistrationNumber { get; set; }
        public decimal Mileage { get; set; }
        public string ColorOutsideHex { get; set; }
        public string ColorInsideHex { get; set; }
        public decimal FuelCity { get; set; }
        public decimal FuelHighway { get; set; }
        public int CompressionRatio { get; set; }
        public string CompressionType { get; set; }
        public string Configuration { get; set; }
        public string Cylinders { get; set; }
        public string Displacement { get; set; }
        public int Size { get; set; }
        public int Torque { get; set; }
        public int TotalValves { get; set; }
        public string SafetyUrl { get; set; }
        public int SafetyStars { get; set; }
        public string Additional { get; set; }
        public int FuelTypeId { get; set; }
        public int TransmissionId { get; set; }
        public string Engine { get; set; }
        public int Year { get; set; }
        public int HorsePower { get; set; }
        public ImageViewModel MainImage { get; set; }
        public VehicleModelViewModel VehicleModel { get; set; } // TODO: use only id (int)
        public List<FeatureAdminSelectViewModel> FeaturesAdminSelect { get; set; } = new List<FeatureAdminSelectViewModel>();  // TODO: use only ids (list of ints)---- It uses id-s, but it's required in Value name for displaying in select
        public List<VehicleImageViewModel> Images { get; set; } = new List<VehicleImageViewModel>();
        public List<VehicleDescriptionViewModel> Descriptions { get; set; } = new List<VehicleDescriptionViewModel>();
    }
}