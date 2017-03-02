using System;
using Triven.Domain.Constants;
using Triven.Domain.Models;
using Triven.Domain.Models.User;

namespace Triven.Data.EntityFramework.Models.User
{
    [Obsolete]
    public class UserContactInfo : IApplicationUserContactInfo
    {
      public string Phone { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string ZipCode { get; set; }

        public string WWW { get; set; }

        public string Skype { get; set; }
        

        public IApplicationUser ApplicationUser { get; set; }

        public int Id { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public DateTime? DeletedOn { get; set; }
        public IApplicationUser Creator { get; set; }
        public IApplicationUser Modifier { get; set; }
        public IApplicationUser Remover { get; set; }
        public string ModifierUserIp { get; set; }
        public ContactInfoType Type { get; set; }
    }
}
