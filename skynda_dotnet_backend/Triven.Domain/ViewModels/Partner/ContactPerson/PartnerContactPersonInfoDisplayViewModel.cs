using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Constants;

namespace X3Project.Domain.ViewModels.Partner.ContactPerson
{
    public class PartnerContactPersonInfoDisplayViewModel
    {
        public int Id { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string WWW { get; set; }
        public string Skype { get; set; }

        public ContactInfoType Type { get; set; }
    }
}
