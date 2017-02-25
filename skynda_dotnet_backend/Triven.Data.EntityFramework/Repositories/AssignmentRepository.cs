using X3Project.Data.EntityFramework.Models.Assignmnet;
using X3Project.Data.EntityFramework.Repositories.Base;
using X3Project.Domain.Models.Assignment;
using X3Project.Domain.Repositories.Assignment;

namespace X3Project.Data.EntityFramework.Repositories
{
    public class AssignmentRepository : BaseCrudRepository<AssignmentModel>, IAssignmentRepository<AssignmentModel>
    {
    }
}
