using Triven.Data.EntityFramework.Models.User;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class AccountRepository : BaseCrudRepository<ApplicationUser>, IAccountRepository<ApplicationUser>
    {
        
    }
}