using X3Project.Domain.Models;
using X3Project.Domain.Repositories.Base;

namespace X3Project.Domain.Repositories
{
    public interface IAccountRepository<TApplicationUser> : IBaseCrudRepository<TApplicationUser>
        where TApplicationUser : IApplicationUser
    {
        
    }
}