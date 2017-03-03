using System;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.Models;
using Triven.Domain.Models.Base;

namespace Triven.Data.EntityFramework.Models.Base
{
    public abstract class AuditableModel : IAuditableBaseModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int Id { get; set; }

        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public DateTime? CreatedOn { get; set; }
        /// <summary>
        /// User ID who created
        /// </summary>
        public ApplicationUser Creator { get; set; }

        /// <summary>
        /// User ID who updated
        /// </summary>
        public ApplicationUser Modifier { get; set; }

        /// <summary>
        /// User ID who archived
        /// </summary>
        public ApplicationUser Remover { get; set; }


        public string ModifierUserIp { get; set; }

        public bool IsArchived => DeletedOn.HasValue;
    }
}
