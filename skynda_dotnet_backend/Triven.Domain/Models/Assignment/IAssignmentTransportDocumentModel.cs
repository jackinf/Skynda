using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Models.Assignment
{
    public interface IAssignmentTransportDocumentModel : IBaseModel
    {
        int AssignmentId_FK { get; set; }

        //IAssignmentModel Assignment { get; set; }

        bool IsMandatory { get; set; }

        string DocumentType { get; set; }

        DateTime UploadedOn { get; set; }

        bool IsValid { get; set; }
    }
}
