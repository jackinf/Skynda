using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("Classification")]
    public class Classification : AuditableModel, IClassification
    {
        public string Description { get; set; }

        public bool IsImported { get; set; }

        public int Weight { get; set; }

        public string Value { get; set; }

        public string Name { get; set; }

        /// <summary>
        /// many-to-one relation of ClassificationType
        /// </summary>
        public ClassificationType ClassificationType { get; set; }

        public bool IsActive { get; set; }

        public string Value2 { get; set; }
    }
}