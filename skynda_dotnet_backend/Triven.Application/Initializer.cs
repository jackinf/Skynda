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
                configuration.CreateMap<AccountDisplayViewModel, ApplicationUser>().ForMember(x => x.ContactInfos, opt => opt.Ignore());
                configuration.CreateMap<UserContactInfo, AccountContactInfoDisplayModel>().ReverseMap();    // TODO: Not needed

                // Unsorted
                configuration.CreateMap<Classification, ClassificationViewModel>();
                configuration.CreateMap<ClassificationViewModel, Classification>();

                configuration.CreateMap<ClassificationType, ClassificationTypeViewModel>();
                configuration.CreateMap<ClassificationTypeViewModel, ClassificationType>().ForMember(x => x.Classifications, opt => opt.Ignore());

                configuration.CreateMap<Feature, FeatureViewModel>();
                configuration.CreateMap<FeatureViewModel, Feature>();

                configuration.CreateMap<Image, ImageViewModel>();
                configuration.CreateMap<ImageViewModel, Image>();

                configuration.CreateMap<Subscription, SubscriptionViewModel>();
                configuration.CreateMap<SubscriptionViewModel, Subscription>();

                configuration.CreateMap<Vehicle, VehicleAdminViewModel>();
                configuration.CreateMap<Vehicle, VehicleDetailedViewModel>();
                configuration.CreateMap<VehicleAdminViewModel, Vehicle>()
                    .ForMember(x => x.Images, opt => opt.Ignore())
                    .ForMember(x => x.Descriptions, opt => opt.Ignore())
                    .ForMember(x => x.Features, opt => opt.Ignore())
                    .ForMember(x => x.Reports, opt => opt.Ignore())
                    .ForMember(x => x.Reviews, opt => opt.Ignore());

                configuration.CreateMap<VehicleDescription, VehicleDescriptionViewModel>();
                configuration.CreateMap<VehicleDescriptionViewModel, VehicleDescription>();

                //configuration.CreateMap<VehicleFault, VehicleFaultViewModel>();
                //configuration.CreateMap<VehicleFaultViewModel, VehicleFault>();

                configuration.CreateMap<VehicleFeature, VehicleFeatureViewModel>();
                configuration.CreateMap<VehicleFeatureViewModel, VehicleFeature>();

                //configuration.CreateMap<VehicleImage, VehicleImageViewModel>();
                //configuration.CreateMap<VehicleImageViewModel, VehicleImage>();

                configuration.CreateMap<VehicleModel, VehicleModelViewModel>();
                configuration.CreateMap<VehicleModelViewModel, VehicleModel>()
                    .ForMember(x => x.VehicleManufacturer, opt => opt.Ignore())
                    .ForMember(x => x.Transmission, opt => opt.Ignore())
                    .ForMember(x => x.Drivetrain, opt => opt.Ignore())
                    .ForMember(x => x.VehicleBody, opt => opt.Ignore())
                    .ForMember(x => x.FuelType, opt => opt.Ignore());

                configuration.CreateMap<VehicleReport, VehicleReportViewModel>();
                configuration.CreateMap<VehicleReportViewModel, VehicleReport>()
                    .ForMember(x => x.VehicleReportItems, opt => opt.Ignore())
                    .ForMember(x => x.Faults, opt => opt.Ignore());

                configuration.CreateMap<VehicleReportItem, VehicleReportItemViewModel>();
                configuration.CreateMap<VehicleReportItemViewModel, VehicleReportItem>();

                configuration.CreateMap<VehicleReview, VehicleReviewViewModel>();
                configuration.CreateMap<VehicleReviewViewModel, VehicleReview>();

                //configuration.CreateMap<PartnerContactPersonDisplayViewModel, PartnerContactPersonModel>()
                //    .ForMember(x => x.ContactInfos, opt => opt.Ignore());
            };

            Mapper.Initialize(configAction);
        }
    }
}