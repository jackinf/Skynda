using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Constants;
using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Models.Classification
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
