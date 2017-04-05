using System.Linq;
using Triven.Data.EntityFramework.Entities.User;
using Triven.Data.EntityFramework.Repositories.Base;
using Triven.Domain.Repositories;

namespace Triven.Data.EntityFramework.Repositories
{
    public class AccountRepository : BaseCrudRepository<ApplicationUser>, IAccountRepository<ApplicationUser>, IUserRepository<ApplicationUser>
    {
        public ApplicationUser GetByEmail(string email)
        {
            using (var context = new ApplicationDbContext())
                return BaseQuery(context).FirstOrDefault(x => x.Email == email);
        }

        public ApplicationUser GetByLogin(string login)
        {
            using (var context = new ApplicationDbContext())
                return BaseQuery(context).FirstOrDefault(x => x.UserName == login);
        }
    }
}