using Ninject.Modules;
using Triven.Application.Results;
using Triven.Application.Services;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Models.User;
using Triven.Data.EntityFramework.Repositories;
using Triven.Domain.Repositories;
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
            Kernel.Bind<IBlobStorageService<ServiceResult>>().To<BlobStorageService>().InTransientScope();
            Kernel.Bind<IClassificationService<ServiceResult>>().To<ClassificationService>().InTransientScope();
            Kernel.Bind<IFeatureService<ServiceResult>>().To<FeatureService>().InTransientScope();
            Kernel.Bind<IImageService<ServiceResult>>().To<ImageService>().InTransientScope();
            Kernel.Bind<ISubscriptionService<ServiceResult>>().To<SubscriptionService>().InTransientScope();
            Kernel.Bind<IVehicleFeatureService<ServiceResult>>().To<VehicleFeatureService>().InTransientScope();
            Kernel.Bind<IVehicleModelService<ServiceResult>>().To<VehicleModelService>().InTransientScope();
            Kernel.Bind<IVehicleReportService<ServiceResult>>().To<VehicleReportService>().InTransientScope();
            Kernel.Bind<IVehicleReviewService<ServiceResult>>().To<VehicleReviewService>().InTransientScope();
            Kernel.Bind<IVehicleService<ServiceResult>>().To<VehicleService>().InTransientScope();

            /*
             * Repositories
             */
            Kernel.Bind<IAccountRepository<ApplicationUser>>().To<AccountRepository>().InTransientScope();
            Kernel.Bind<IClassificationRepository<Classification>>().To<ClassificationRepository>().InTransientScope();
            Kernel.Bind<IFeatureRepository<Feature>>().To<FeatureRepository>().InTransientScope();
            Kernel.Bind<IImageRepository<Image>>().To<ImageRepository>().InTransientScope();
            Kernel.Bind<ISubscriptionRepository<Subscription>>().To<SubscriptionRepository>().InTransientScope();
            Kernel.Bind<IVehicleFeatureRepository<VehicleFeature>>().To<VehicleFeatureRepository>().InTransientScope();
            Kernel.Bind<IVehicleModelRepository<VehicleModel>>().To<VehicleModelRepository>().InTransientScope();
            Kernel.Bind<IVehicleReportRepository<VehicleReport>>().To<VehicleReportRepository>().InTransientScope();
            Kernel.Bind<IVehicleReviewRepository<VehicleReview>>().To<VehicleReviewRepository>().InTransientScope();
            Kernel.Bind<IVehicleRepository<Vehicle>>().To<VehicleRepository>().InTransientScope();

            /*
             * Models
             */


        }
    }
}