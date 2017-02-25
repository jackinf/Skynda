using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Domain.Constants;
using Triven.Domain.Models.User;

namespace Triven.Data.EntityFramework.Models.User
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
