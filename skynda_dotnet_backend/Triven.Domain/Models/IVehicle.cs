using Triven.Domain.Models.Base;

namespace Triven.Domain.Models
{
    public interface IVehicle : IAuditableBaseModel
    {
        string VinCode { get; set; }
        decimal Price { get; set; }
        string RegistrationNumber { get; set; }
        decimal Mileage { get; set; }
        string ColorOutsideHex { get; set; }
        string ColorInsideHex { get; set; }
        decimal FuelCity { get; set; }
        decimal FuelHighway { get; set; }
        int CompressionRatio { get; set; }
        string CompressionType { get; set; }
        string Configuration { get; set; }
        string Cylinders { get; set; }
        string Displacement { get; set; }
        int Size { get; set; }
        int Torque { get; set; }
        int TotalValves { get; set; }
        int Safetystars { get; set; }
        string SafetyUrl { get; set; }
        string Additional { get; set; }        
    }
}