using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("Feature")]
    public class Feature :AuditableModel, IFeature
    {
        public string Description { get; set; }
        public bool IsImported { get; set; }
        public int Weight { get; set; }
        public string Value { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
    }
}