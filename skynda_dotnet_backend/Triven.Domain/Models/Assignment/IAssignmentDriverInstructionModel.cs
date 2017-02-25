using Triven.Domain.Models.Base;

namespace Triven.Domain.Models.Assignment
{
    public interface IAssignmentDriverInstructionModel : IBaseModel
    {
        int AssignmentId_FK { get; set; }
        string Instruction { get; set; }
        //IAssignmentModel Assignment { get; set; }
    }
}
