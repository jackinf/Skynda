using System;
using Triven.Domain.Models.Base;

namespace Triven.Domain.Models.Assignment
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
