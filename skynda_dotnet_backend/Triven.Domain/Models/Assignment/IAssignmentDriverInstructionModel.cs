using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Models.Base;

namespace X3Project.Domain.Models.Assignment
{
    public interface IAssignmentDriverInstructionModel : IBaseModel
    {
        int AssignmentId_FK { get; set; }
        string Instruction { get; set; }
        //IAssignmentModel Assignment { get; set; }
    }
}
