using System.ComponentModel.DataAnnotations.Schema;
using Triven.Domain.Constants;
using Triven.Domain.Extensions;
using Triven.Domain.Models.Partner;

namespace Triven.Data.EntityFramework.Models.Partner
{
    [Table("PartnerContactPersonContactInfo")]
    public class PartnerContactPersonContactInfoModel : IPartnerContactPersonContactInfoModel
    {
        public int Id { get; set; }

        [ForeignKey("PartnerContactPerson")]
        public int PartnerContactPersonId_FK { get; set; }
        public PartnerContactPersonModel PartnerContactPerson { get; set; }

        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string WWW { get; set; }
        public string Skype { get; set; }

        /// <summary>
        /// Enum for DB as string
        /// </summary>
        [Column("Type")]
        public string TypeString
        {
            get { return Type.ToString(); }
            private set { Type = value.ParseEnum<ContactInfoType>(); }
        }

        [NotMapped]
        public ContactInfoType Type { get; set; }
    }
}
