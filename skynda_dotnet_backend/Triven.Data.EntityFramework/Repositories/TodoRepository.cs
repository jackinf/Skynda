using X3Project.Data.EntityFramework.Repositories.Base;
using X3Project.Domain.Models;
using X3Project.Domain.Repositories;

namespace X3Project.Data.EntityFramework.Repositories
{
    public class TodoRepository : BaseCrudRepository<ITodoModel>, ITodoRepository
    {
    }
}