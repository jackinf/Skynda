using Ninject.Modules;
using X3Project.Application.Results;
using X3Project.Application.Services;
using X3Project.Data.EntityFramework.Models;
using X3Project.Data.EntityFramework.Models.Assignmnet;
using X3Project.Data.EntityFramework.Models.MessageTemplate;
using X3Project.Data.EntityFramework.Models.Partner;
using X3Project.Data.EntityFramework.Models.User;
using X3Project.Data.EntityFramework.Repositories;
using X3Project.Domain.Models;
using X3Project.Domain.Repositories;
using X3Project.Domain.Repositories.Assignment;
using X3Project.Domain.Repositories.Message;
using X3Project.Domain.Repositories.Partner;
using X3Project.Domain.Results;
using X3Project.Domain.Services;
using X3Project.Domain.ViewModels;

namespace X3Project.Application.IoCModules
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