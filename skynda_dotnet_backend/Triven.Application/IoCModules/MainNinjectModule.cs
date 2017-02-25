using Ninject.Modules;
using Triven.Application.Results;
using Triven.Application.Services;
using Triven.Data.EntityFramework.Models.User;
using Triven.Data.EntityFramework.Repositories;
using Triven.Domain.Models;
using Triven.Domain.Repositories;
using Triven.Domain.Repositories.Assignment;
using Triven.Domain.Repositories.Message;
using Triven.Domain.Repositories.Partner;
using Triven.Domain.Services;

namespace Triven.Application.IoCModules
{
    public class MainNinjectModule : NinjectModule
    {
        public override void Load()
        {
            /*
             * Services
             */ 
            Kernel.Bind<IAccountService<ServiceResult>>().To<AccountService>().InTransientScope();

            /*
             * Repositories
             */
            Kernel.Bind<IAccountRepository<ApplicationUser>>().To<AccountRepository>().InTransientScope();

            /*
             * Models
             */


        }
    }
}