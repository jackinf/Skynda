using Triven.Data.EntityFramework.Models.User;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class AccountRepository : BaseCrudRepository<ApplicationUser>, IAccountRepository<ApplicationUser>, IUserRepository<ApplicationUser>
    {
        public ApplicationUser GetByEmail(string email)
        {
            throw new System.NotImplementedException();
        }

        public ApplicationUser GetByLogin(string login)
        {
            throw new System.NotImplementedException();
        }
    }
}