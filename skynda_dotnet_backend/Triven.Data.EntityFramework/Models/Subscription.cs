using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("Subscription")]
    public class Subscription : AuditableModel, ISubscription
    {
        public bool IsActive { get; set; }
        public string Email { get; set; }
        public int UserId { get; set; }
    }
}