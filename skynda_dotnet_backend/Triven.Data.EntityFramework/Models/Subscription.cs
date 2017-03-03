using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("Subscription")]
    public class Subscription : AuditableModel, ISubscription
    {
        public bool IsActive { get; set; }
        public string Email { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}