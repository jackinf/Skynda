using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Constants;
using Triven.Domain.Extensions;
using Triven.Domain.Models.Classification;

namespace Triven.Data.EntityFramework.Models.Classification
{
    [Table("Classification")]
    public class ClassificationModel : AuditableModel, IClassificationModel
    {
        public string Name { get; set; }
        public int? Parent_FK { get; set; }

        /// <summary>
        /// Classification values 
        /// </summary>
        [InverseProperty("Classification")]
        public virtual List<ClassificationValueModel> Values { get; set; }

        /// <summary>
        /// Parent classification
        /// </summary>
        public virtual ClassificationModel ParentItem { get; set; }

        /// <summary>
        /// Child classifications
        /// </summary>
        public virtual List<ClassificationModel> ChildItems { get; set; }

        /// <summary>
        /// Enum for DB as string
        /// </summary>
        [Column("Status")]
        public string StatusString
        {
            get { return Status.ToString(); }
            private set { Status = value.ParseEnum<Status>(); }
        }

        [NotMapped]
        public Status Status { get; set; }
    }
}
