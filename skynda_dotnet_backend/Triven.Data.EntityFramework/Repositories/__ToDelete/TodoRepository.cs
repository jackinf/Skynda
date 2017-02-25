using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Models;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class TodoRepository : BaseCrudRepository<ITodoModel>, ITodoRepository
    {
    }
}