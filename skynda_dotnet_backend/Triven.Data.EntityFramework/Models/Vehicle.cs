using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    public class Vehicle : AuditableModel, IVehicle
    {
        public string VinCode { get; set; }
        public decimal Price { get; set; }
        public string RegistrationNumber { get; set; }
        public decimal Mileage { get; set; }
        public string ColorOutsideHex { get; set; }
        public string ColorInsideHex { get; set; }
        public decimal FuelCity { get; set; }
        public decimal FuelHighway { get; set; }
        public string Problems { get; set; }
        public int CompressionRatio { get; set; }
        public string CompressionType { get; set; }
        public string Configuration { get; set; }
        public string Cylinders { get; set; }
        public string Displacement { get; set; }
        public int Size { get; set; }
        public int Torque { get; set; }
        public int TotalValves { get; set; }
        public int Safetystars { get; set; }
        public string SafetyUrl { get; set; }
        public string Additional { get; set; }
        public int OwnerId { get; set; }
        public int MainImageId { get; set; }
        public int ModelId { get; set; }
    }
}