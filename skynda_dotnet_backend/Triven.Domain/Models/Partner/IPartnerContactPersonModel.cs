using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Constants;
using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Models.Partner
{
    public interface IPartnerContactPersonModel : IAuditableBaseModel
    {
        /// <summary>
        /// Partner database Id
        /// </summary>
        int PartnerId_FK { get; set; }

        /// <summary>
        /// Contact person first name
        /// </summary>
        string FirstName { get; set; }


        /// <summary>
        /// Contact person last name
        /// </summary>
        string LastName { get; set; }

        /// <summary>
        /// Contact is also partner CEO
        /// </summary>
        bool IsCeo { get; set; }

        /// <summary>
        /// What is the job
        /// </summary>
        string Job { get; set; }

        Status Status { get; set; }
    }
}
