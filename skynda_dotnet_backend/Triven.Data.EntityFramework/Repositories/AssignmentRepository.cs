using Triven.Data.EntityFramework.Models.Assignmnet;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories.Assignment;

namespace Triven.Data.EntityFramework.Repositories
{
    public class AssignmentRepository : BaseCrudRepository<AssignmentModel>, IAssignmentRepository<AssignmentModel>
    {
    }
}
