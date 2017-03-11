using System;
using AutoMapper;
using Ninject;
using Triven.Application.IoCModules;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.ViewModels.Account;
using Triven.Domain.ViewModels.Classification;
using Triven.Domain.ViewModels.Feature;
using Triven.Domain.ViewModels.Image;
using Triven.Domain.ViewModels.Subscription;
using Triven.Domain.ViewModels.Vehicle;

namespace Triven.Application
{
    /// <summary>
    /// Connects interfaces with implementations, creates mappings.
    /// </summary>
    public static class Initializer
    {
        public static void Initialize()
        {
            InitializeMappings();
            IoC.Kernel = new StandardKernel(new MainNinjectModule());
        }

        private static void InitializeMappings()
        {
            Action<IMapperConfigurationExpression> configAction = configuration =>
            {
                // Account
                configuration.CreateMap<ApplicationUser, AccountDisplayViewModel>();
                configuration.CreateMap<AccountDisplayViewModel, ApplicationUser>().ForMember(x => x.ContactInfos, opt => opt.Ignore()); //TODO not needed ? 
                //configuration.CreateMap<UserContactInfo, AccountContactInfoDisplayModel>().ReverseMap();    // TODO: Not needed

                // Unsorted
                configuration.CreateMap<Classification, ClassificationViewModel>();
                configuration.CreateMap<ClassificationViewModel, Classification>();

                configuration.CreateMap<ClassificationType, ClassificationTypeViewModel>();
                configuration.CreateMap<ClassificationTypeViewModel, ClassificationType>();

                configuration.CreateMap<Feature, FeatureViewModel>();
                configuration.CreateMap<FeatureViewModel, Feature>();

                configuration.CreateMap<Image, ImageViewModel>();
                configuration.CreateMap<ImageViewModel, Image>();

                configuration.CreateMap<Subscription, SubscriptionViewModel>();
                configuration.CreateMap<SubscriptionViewModel, Subscription>();

                configuration.CreateMap<Vehicle, VehicleAdminViewModel>().PreserveReferences()
                    .ForMember(x => x.Features, conf => conf.Ignore());
                configuration.CreateMap<Vehicle, VehicleDetailedViewModel>().PreserveReferences();
                configuration.CreateMap<VehicleAdminViewModel, Vehicle>()
                    .ForMember(x => x.Features, conf => conf.Ignore())
                    .ForMember(x => x.Descriptions, conf => conf.Ignore());

                configuration.CreateMap<VehicleDescription, VehicleDescriptionViewModel>().PreserveReferences()
                    .ForMember(x => x.Vehicle, conf => conf.Ignore());
                configuration.CreateMap<VehicleDescriptionViewModel, VehicleDescription>()
                    .ForMember(x => x.Vehicle, conf => conf.Ignore());

                //configuration.CreateMap<VehicleFault, VehicleFaultViewModel>();
                //configuration.CreateMap<VehicleFaultViewModel, VehicleFault>();

                configuration.CreateMap<VehicleFeature, VehicleFeatureViewModel>().PreserveReferences()
                    .ForMember(x => x.Vehicle, conf => conf.Ignore());
                configuration.CreateMap<VehicleFeatureViewModel, VehicleFeature>();

                //configuration.CreateMap<VehicleImage, VehicleImageViewModel>();
                //configuration.CreateMap<VehicleImageViewModel, VehicleImage>();

                configuration.CreateMap<VehicleModel, VehicleModelViewModel>().PreserveReferences();
                configuration.CreateMap<VehicleModelViewModel, VehicleModel>();

                configuration.CreateMap<VehicleReport, VehicleReportViewModel>().PreserveReferences()
                    .ForMember(x => x.Vehicle, conf => conf.Ignore());
                configuration.CreateMap<VehicleReportViewModel, VehicleReport>();

                configuration.CreateMap<VehicleReportItem, VehicleReportItemViewModel>().PreserveReferences();
                configuration.CreateMap<VehicleReportItemViewModel, VehicleReportItem>();

                configuration.CreateMap<VehicleReview, VehicleReviewViewModel>().PreserveReferences();
                configuration.CreateMap<VehicleReviewViewModel, VehicleReview>();

                configuration.CreateMap<VehicleImage, VehicleImageViewModel>().PreserveReferences()
                    .ForMember(x => x.Vehicle, conf => conf.Ignore()); 
                configuration.CreateMap<VehicleImageViewModel, VehicleImage>();
                //configuration.CreateMap<PartnerContactPersonDisplayViewModel, PartnerContactPersonModel>()
                //    .ForMember(x => x.ContactInfos, opt => opt.Ignore());
            };

            Mapper.Initialize(configAction);
        }
    }
}