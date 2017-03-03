using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("VehicleReview")]
    public class VehicleReview: AuditableModel, IVehicleReview
    {
        public int LogoId { get; set; }
        public int VideoId { get; set; }
        public int Rating { get; set; }
        public Vehicle Vehicle { get; set; }    
        public string Text { get; set; }
    }
}