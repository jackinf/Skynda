using X3Project.Domain.Models;
using X3Project.Domain.Repositories.Base;

namespace X3Project.Domain.Repositories
{
    public interface ITodoRepository : IBaseCrudRepository<ITodoModel>
    {
        
    }
}