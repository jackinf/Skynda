using System;

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

        /// <summary>
        /// User ID who created
        /// </summary>
        int? CreatedBy { get; set; }

        /// <summary>
        /// User ID who updated
        /// </summary>
        int? UpdatedBy { get; set; }

        /// <summary>
        /// User ID who archived
        /// </summary>
        int? DeletedBy { get; set; }

        //IApplicationUser<IApplicationUserContactInfo> Creator { get; set; }

        //IApplicationUser<IApplicationUserContactInfo> Modifier { get; set; }

        //IApplicationUser<IApplicationUserContactInfo> Remover { get; set; }
    }
}
