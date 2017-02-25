using System.ComponentModel.DataAnnotations.Schema;
using Triven.Domain.Models.Assignment;

namespace Triven.Data.EntityFramework.Models.Assignmnet
{
    [Table("AssignmentDriverInstruction")]
    public class AssignmentDriverInstructionModel : IAssignmentDriverInstructionModel
    {
        public int Id { get; set; }
        public int AssignmentId_FK { get; set; }
        public string Instruction { get; set; }
    }
}
