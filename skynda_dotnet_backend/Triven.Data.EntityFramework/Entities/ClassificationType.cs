using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Entities.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Entities
{
    [Table("ClassificationType")]
    public class ClassificationType : AuditableModel, IClassificationType
    {
        public string Name { get; set; }
        public string Description { get; set; }

        /// <summary>
        /// Classifications
        /// </summary>
        [InverseProperty(nameof(Classification.ClassificationType))]
        public virtual List<Classification> Classifications { get; set; } = new List<Classification>();
    }
}