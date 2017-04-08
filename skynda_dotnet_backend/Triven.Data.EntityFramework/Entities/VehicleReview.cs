using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Entities.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Entities
{
    [Table("VehicleReview")]
    public class VehicleReview: AuditableModel, IVehicleReview
    {
        public int LogoId { get; set; }
        public int VideoId { get; set; }

        public string VideoUrl { get; set; }

        public string LogoUrl { get; set; }

        public int Rating { get; set; }

        public string Text { get; set; }

        public int VehicleId { get; set; }

        public virtual Vehicle Vehicle { get; set; }
    }
}