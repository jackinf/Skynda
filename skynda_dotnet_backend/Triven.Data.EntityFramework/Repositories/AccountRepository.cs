using System.Linq;
using Triven.Data.EntityFramework.Models.User;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class AccountRepository : BaseCrudRepository<ApplicationUser>, IAccountRepository<ApplicationUser>, IUserRepository<ApplicationUser>
    {
        public ApplicationUser GetByEmail(string email)
        {
            return BaseQuery().FirstOrDefault(x => x.Email == email);
        }

        public ApplicationUser GetByLogin(string login)
        {
            return BaseQuery().FirstOrDefault(x => x.UserName == login);
        }
    }
}