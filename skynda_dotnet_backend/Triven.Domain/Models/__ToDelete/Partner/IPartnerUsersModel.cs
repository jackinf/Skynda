using System.ComponentModel.DataAnnotations;

namespace Triven.Domain.Models.Partner
{
    /// <summary>
    /// Partner users 
    /// Users who can see partner limited portal views
    /// </summary>
    public interface IPartnerUsersModel
    {
        [Key]
        int PartnerId_FK { get; set; }
        [Key]
        int UserId_FK { get; set; }
    }
}
