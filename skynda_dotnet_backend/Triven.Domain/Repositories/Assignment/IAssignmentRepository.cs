using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using X3Project.Domain.Models.Assignment;
using X3Project.Domain.Models.Partner;
using X3Project.Domain.Repositories.Base;

namespace X3Project.Domain.Repositories.Assignment
{
    public interface IAssignmentRepository<TAssignmentModel> : IBaseCrudRepository<TAssignmentModel>
        where TAssignmentModel : IAssignmentModel
    {
    }
}
