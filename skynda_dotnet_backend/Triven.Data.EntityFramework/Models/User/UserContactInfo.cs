using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Constants;
using X3Project.Domain.Models.User;

namespace X3Project.Data.EntityFramework.Models.User
{
    public class UserContactInfo : IApplicationUserContactInfo
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("ApplicationUser")]
        public int ApplicationUserId { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string ZipCode { get; set; }

        public string WWW { get; set; }

        public string Skype { get; set; }

        public ContactInfoType Type { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

    }
}
