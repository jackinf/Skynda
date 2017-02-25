using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace X3Project.Domain.Models.Partner
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
