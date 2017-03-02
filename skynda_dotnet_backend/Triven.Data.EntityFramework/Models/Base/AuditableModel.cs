using System;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.Models;
using Triven.Domain.Models.Base;

namespace Triven.Data.EntityFramework.Models.Base
{
    public abstract class AuditableModel : IAuditableBaseModel
    {
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public DateTime? CreatedOn { get; set; }

        public IApplicationUser Creator { get; set; }

        public IApplicationUser Modifier { get; set; }
        public IApplicationUser Remover { get; set; }

        public string ModifierUserIp { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int Id { get; set; }

        public bool IsArchived => DeletedOn.HasValue;
    }
}
