using Triven.Domain.Constants;
using Triven.Domain.Models.Base;

namespace Triven.Domain.Models.Classification
{
    public interface IClassificationModel : IAuditableBaseModel
    {
        /// <summary>
        /// Classification name
        /// </summary>
        string Name { get; set; }
        /// <summary>
        /// Classification can have parent (other classification)
        /// </summary>
        int? Parent_FK { get; set; }

        Status Status { get; set; }
    }
}
