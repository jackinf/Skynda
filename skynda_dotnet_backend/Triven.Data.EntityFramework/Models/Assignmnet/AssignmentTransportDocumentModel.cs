using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Models.Assignment;

namespace X3Project.Data.EntityFramework.Models.Assignmnet
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
