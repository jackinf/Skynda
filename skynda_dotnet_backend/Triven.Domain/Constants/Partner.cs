using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace X3Project.Domain.Constants
{
    public enum PartnerStatus
    {
        /// <summary>
        /// Not selected
        /// </summary>
        NotSelected = 0,
        /// <summary>
        /// Active
        /// </summary>
        Active = 1,
        /// <summary>
        /// In active
        /// </summary>
        InActive = 2,
        /// <summary>
        /// Deleted 
        /// </summary>
        Deleted = 3,
        /// <summary>
        /// waiting confirmation 
        /// </summary>
        WaitingConfirm = 4,
    }
}
