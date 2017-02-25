using X3Project.Data.EntityFramework.Models.User;
using X3Project.Data.EntityFramework.Repositories.Base;
using X3Project.Domain.Repositories;

namespace X3Project.Data.EntityFramework.Repositories
{
    public class AccountRepository : BaseCrudRepository<ApplicationUser>, IAccountRepository<ApplicationUser>
    {
        
    }
}