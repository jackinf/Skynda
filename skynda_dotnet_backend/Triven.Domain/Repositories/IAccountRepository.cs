using Triven.Domain.Models;
using Triven.Domain.Repositories.Base;

namespace Triven.Domain.Repositories
{
    public interface IAccountRepository<TApplicationUser> : IBaseCrudRepository<TApplicationUser>
        where TApplicationUser : IApplicationUser
    {
        
    }
}