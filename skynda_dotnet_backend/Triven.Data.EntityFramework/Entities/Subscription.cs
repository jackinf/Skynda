using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Entities.Base;
using Triven.Data.EntityFramework.Entities.User;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Entities
{
    [Table("Subscription")]
    public class Subscription : AuditableModel, ISubscription
    {
        public bool IsActive { get; set; }
        public string Email { get; set; }

        public int ApplicationUserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}