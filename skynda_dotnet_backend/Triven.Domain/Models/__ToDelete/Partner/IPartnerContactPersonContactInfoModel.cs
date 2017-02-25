using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Domain.Constants;

namespace Triven.Domain.Models.Partner
{
    public interface IPartnerContactPersonContactInfoModel
    {
        [Key]
        int Id { get; set; }

        [ForeignKey("PartnerContactPersonId")]
        int PartnerContactPersonId_FK { get; set; }

        string Phone { get; set; }

        string Email { get; set; }

        string Address { get; set; }

        string City { get; set; }

        string Country { get; set; }

        string ZipCode { get; set; }

        string WWW { get; set; }

        string Skype { get; set; }

        ContactInfoType Type { get; set; }
    }
}
