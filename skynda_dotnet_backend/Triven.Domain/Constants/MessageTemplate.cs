using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace X3Project.Domain.Constants
{
    /// <summary>
    /// Application message template names
    /// </summary>
    public enum MessageTemplates
    {
        /// <summary>
        /// Email for confirm new partner account email
        /// </summary>
        ConfirmEmail = 1,

        /// <summary>
        /// Email for admin user (partner email is confirmed)
        /// </summary>
        PartnerEmailIsConfirmed = 2
    }
}
