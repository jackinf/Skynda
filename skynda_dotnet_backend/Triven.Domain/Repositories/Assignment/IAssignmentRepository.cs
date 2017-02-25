using Triven.Domain.Models.Assignment;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories.Assignment
{
    public interface IAssignmentRepository<TAssignmentModel> : IBaseCrudRepository<TAssignmentModel>
        where TAssignmentModel : IAssignmentModel
    {
    }
}
