using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Entities.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Entities
{
    [Table("Classification")]
    public class Classification : AuditableModel, IClassification
    {
        public string Description { get; set; }

        public bool IsImported { get; set; }

        public int Weight { get; set; }

        public string Value { get; set; }

        public string Name { get; set; }

        [ForeignKey(nameof(ClassificationType))]
        public int ClassificationTypeId { get; set; }

        /// <summary>
        /// many-to-one relation of ClassificationType
        /// </summary>
        public virtual ClassificationType ClassificationType { get; set; }

        public bool IsActive { get; set; }

        public string Value2 { get; set; }
    }
}