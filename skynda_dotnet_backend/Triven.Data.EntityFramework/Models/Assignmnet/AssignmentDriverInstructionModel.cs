using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Models.Assignment;

namespace X3Project.Data.EntityFramework.Models.Assignmnet
{
    [Table("AssignmentDriverInstruction")]
    public class AssignmentDriverInstructionModel : IAssignmentDriverInstructionModel
    {
        public int Id { get; set; }
        public int AssignmentId_FK { get; set; }
        public string Instruction { get; set; }
    }
}
