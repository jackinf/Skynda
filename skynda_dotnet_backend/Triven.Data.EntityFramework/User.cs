using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Models.Base;
using Triven.Domain.Models;

namespace Triven.Data.EntityFramework
{
    [Table("Users")]
    public class User : AuditableModel, IUser
    {
        public string Login { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public string Language { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Enabled { get; set; }      
    }
}