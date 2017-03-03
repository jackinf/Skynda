using System;
using Triven.Domain.Models.User;

namespace Triven.Domain.Models.Base
{
    public interface IAuditableBaseModel : IBaseModel
    {
        /// <summary>
        /// Date when created
        /// </summary>
        DateTime? CreatedOn { get; set; }

        /// <summary>
        /// Date when updated
        /// </summary>
        DateTime? UpdatedOn { get; set; }
        /// <summary>
        /// Date when deleted
        /// </summary>
        DateTime? DeletedOn { get; set; }



        string ModifierUserIp { get; set; }

    }
}
