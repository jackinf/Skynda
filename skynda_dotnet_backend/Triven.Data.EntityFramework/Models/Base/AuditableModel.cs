using System;
using System.ComponentModel.DataAnnotations.Schema;
using X3Project.Data.EntityFramework.Models.User;
using X3Project.Domain.Models.Base;

namespace X3Project.Data.EntityFramework.Models.Base
{
    public abstract class AuditableModel : IAuditableBaseModel
    {
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public DateTime? CreatedOn { get; set; }

        [ForeignKey("Creator")]
        public int? CreatedBy { get; set; }
        public ApplicationUser Creator { get; set; }

        [ForeignKey("Modifier")]
        public int? UpdatedBy { get; set; }
        public ApplicationUser Modifier { get; set; }

        [ForeignKey("Remover")]
        public int? DeletedBy { get; set; }
        public ApplicationUser Remover { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int Id { get; set; }
    }
}
