using Ninject.Modules;
using Triven.Application.Results;
using Triven.Application.Services;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Models.Assignmnet;
using Triven.Data.EntityFramework.Models.MessageTemplate;
using Triven.Data.EntityFramework.Models.Partner;
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
            Kernel.Bind<ITodoService>().To<TodoService>().InTransientScope();
            Kernel.Bind<IPartnerService<ServiceResult>>().To<PartnerService>().InTransientScope();
            Kernel.Bind<IAssignmentService<ServiceResult>>().To<AssignmentService>().InTransientScope();

            /*
             * Repositories
             */
            Kernel.Bind<IAccountRepository<ApplicationUser>>().To<AccountRepository>().InTransientScope();
            Kernel.Bind<ITodoRepository>().To<TodoRepository>().InTransientScope();
            Kernel.Bind<IPartnerRepository<PartnerModel>>().To<PartnerRepository>().InTransientScope();
            Kernel.Bind<IAssignmentRepository<AssignmentModel>>().To<AssignmentRepository>().InTransientScope();
            Kernel.Bind<IMessageRepository<MessageTemplateModel>>().To<MessageTemplateRepository>().InTransientScope();

            /*
             * Models
             */
            Kernel.Bind<ITodoModel>().To<TodoModel>().InTransientScope();


        }
    }
}