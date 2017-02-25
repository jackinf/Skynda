using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Domain.Constants;

namespace Triven.Domain.Models.User
{
    public interface IApplicationUserContactInfo
    {
        [Key]
        int Id { get; set; }

        [ForeignKey("UserId")]
        int ApplicationUserId { get; set; }

        string Phone { get; set; }

        string Email { get; set; }

        string Address { get; set; }

        string City { get; set; }

        string ZipCode { get; set; }

        string Country { get; set; }

        string WWW { get; set; }

        string Skype { get; set; }

        ContactInfoType Type { get; set; }
    }
}
