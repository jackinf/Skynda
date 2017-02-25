using System;
using System.ComponentModel.DataAnnotations.Schema;
using Triven.Domain.Models.Assignment;

namespace Triven.Data.EntityFramework.Models.Assignmnet
{
    [Table("AssignmentTransportDocument")]
    public class AssignmentTransportDocumentModel: IAssignmentTransportDocumentModel
    {
        public int Id { get; set; }

        [ForeignKey("Assignment")]
        public int AssignmentId_FK { get; set; }
        public virtual AssignmentModel Assignment { get; set; }

        public bool IsMandatory { get; set; }
        public string DocumentType { get; set; }
        public DateTime UploadedOn { get; set; }
        public bool IsValid { get; set; }
    }
}
