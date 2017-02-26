using System;

namespace Triven.Domain.Constants
{
    public enum Status
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
        Deleted = 3
    }

    [Obsolete("Not needed")]
    public enum ContactInfoType
    {
        /// <summary>
        /// Not selected
        /// </summary>
        NotSelected = 0,

        /// <summary>
        /// Home contact info
        /// </summary>
        Home = 1,

        /// <summary>
        /// Work contact info
        /// </summary>
        Work = 2,
    }
}
