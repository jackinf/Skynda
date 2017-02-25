using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("ClassificationType")]
    public class ClassificationType : AuditableModel, IClassificationType
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}