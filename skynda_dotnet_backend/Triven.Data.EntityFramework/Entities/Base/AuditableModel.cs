using System;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Entities.User;
using Triven.Domain.Models.Base;

namespace Triven.Data.EntityFramework.Entities.Base
{
    public abstract class AuditableModel : IAuditableBaseModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public DateTime? CreatedOn { get; set; }
        /// <summary>
        /// User ID who created
        /// </summary>
        public int? CreatorId { get; set; }
        public virtual ApplicationUser Creator { get; set; }

        /// <summary>
        /// User ID who updated
        /// </summary>
        public int? ModifierId { get; set; }
        public virtual ApplicationUser Modifier { get; set; }

        /// <summary>
        /// User ID who archived
        /// </summary>
        public int? RemoverId { get; set; }
        public virtual ApplicationUser Remover { get; set; }


        public string ModifierUserIp { get; set; }

        public bool IsArchived => DeletedOn.HasValue;
    }
}
