using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework.Models
{
    [Table("Authority")]
    public class Authority : AuditableModel, IAuthority
    {
        public string Name { get; set; }
    }
}