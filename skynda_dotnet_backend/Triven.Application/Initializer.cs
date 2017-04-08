using System;
using AutoMapper;
using Ninject;
using Triven.Application.IoCModules;
using Triven.Data.EntityFramework.Entities;
using Triven.Data.EntityFramework.Entities.User;
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
                configuration.CreateMap<AccountDisplayViewModel, ApplicationUser>()
                    .ForMember(x => x.Id, opt => opt.Ignore())
                    .ForMember(x => x.ContactInfos, opt => opt.Ignore()); //TODO not needed ? 
                //configuration.CreateMap<UserContactInfo, AccountContactInfoDisplayModel>().ReverseMap();    // TODO: Not needed

                // Unsorted
                configuration.CreateMap<Classification, ClassificationViewModel>();
                configuration.CreateMap<ClassificationViewModel, Classification>()
                    .ForMember(x => x.Id, opt => opt.Ignore());

                configuration.CreateMap<ClassificationType, ClassificationTypeViewModel>();
                configuration.CreateMap<ClassificationTypeViewModel, ClassificationType>()
                    .ForMember(x => x.Id, opt => opt.Ignore());

                configuration.CreateMap<Feature, FeatureViewModel>();
                configuration.CreateMap<FeatureViewModel, Feature>()
                    .ForMember(x => x.Id, opt => opt.Ignore());

                configuration.CreateMap<Image, ImageViewModel>();
                configuration.CreateMap<ImageViewModel, Image>()
                    .ForMember(x => x.Id, opt => opt.Ignore());

                configuration.CreateMap<Subscription, SubscriptionViewModel>();
                configuration.CreateMap<SubscriptionViewModel, Subscription>()
                    .ForMember(x => x.Id, opt => opt.Ignore());

                configuration.CreateMap<Vehicle, VehicleAdminViewModel>().PreserveReferences();
                    //.ForMember(x => x.Features, conf => conf.Ignore());
                configuration.CreateMap<Vehicle, VehicleDetailedViewModel>()
                    .PreserveReferences()
                    .ForMember(x => x.VehicleDrivetrain, opt => opt.MapFrom(xx => xx.VehicleModel.Drivetrain.Name))
                    .ForMember(x => x.TransmissionName, opt => opt.MapFrom(xx => xx.Transmission.Name))
                    .ForMember(x => x.FuelName, opt => opt.MapFrom(xx => xx.FuelType.Name))
                    .ForMember(x => x.Doors, opt => opt.MapFrom(xx => xx.VehicleModel.Doors))
                    .ForMember(x => x.Seats, opt => opt.MapFrom(xx => xx.VehicleModel.Seats))
                    .ForMember(x => x.ModelCode, opt => opt.MapFrom(xx => xx.VehicleModel.ModelCode))
                    .ForMember(x => x.MainImageUrl, opt => opt.MapFrom(xx => xx.MainImage.Url))
                    .ForMember(x => x.VehicleManufacturerName, opt => opt.MapFrom(xx => xx.VehicleModel.VehicleManufacturer.Name));
                configuration.CreateMap<Vehicle, VehicleCompactViewModel>()
                    .PreserveReferences()
                    .ForMember(x => x.ThumbnailUrl, opt => opt.MapFrom(xx => xx.MainImage.ThumbnailUrl))
                    .ForMember(x => x.ModelCode, opt => opt.MapFrom(xx => xx.VehicleModel.ModelCode))
                    .ForMember(x => x.ModelHorsePower, opt => opt.MapFrom(xx => xx.HorsePower))
                    .ForMember(x => x.ModelDoors, opt => opt.MapFrom(xx => xx.VehicleModel.Doors))
                    .ForMember(x => x.ModelSeats, opt => opt.MapFrom(xx => xx.VehicleModel.Seats))
                    .ForMember(x => x.ModelYear, opt => opt.MapFrom(xx => xx.Year))
                    .ForMember(x => x.VehicleManufacturerName, opt => opt.MapFrom(xx => xx.VehicleModel.VehicleManufacturer.Name));
                configuration.CreateMap<VehicleAdminViewModel, Vehicle>()
                    .ForMember(x => x.Id, opt => opt.Ignore())
                    .ForMember(x => x.Features, conf => conf.Ignore())
                    .ForMember(x => x.VehicleStatus, conf => conf.Ignore())
                    .ForMember(x => x.Images, conf => conf.Ignore())
                    .ForMember(x => x.Descriptions, conf => conf.Ignore())
                    .ForMember(x => x.ApplicationUser, conf => conf.Ignore())
                    .ForMember(x => x.VehicleModel, conf => conf.Ignore())
                    //.ForMember(x => x.VehicleModelId, conf => conf.Ignore())
                    .ForMember(x => x.MainImage, conf => conf.Ignore());
                    //.ForMember(x => x.MainImageId, conf => conf.Ignore())

                configuration.CreateMap<VehicleDescription, VehicleDescriptionViewModel>().PreserveReferences()
                    .ForMember(x => x.Vehicle, conf => conf.Ignore());
                configuration.CreateMap<VehicleDescriptionViewModel, VehicleDescription>()
                    .ForMember(x => x.Id, opt => opt.Ignore())
                    .ForMember(x => x.Vehicle, conf => conf.Ignore());

                configuration.CreateMap<VehicleFault, FaultBaseViewModel>().ReverseMap();

                configuration.CreateMap<VehicleFeature, VehicleFeatureViewModel>().PreserveReferences()
                    .ForMember(x => x.Vehicle, conf => conf.Ignore());
                configuration.CreateMap<VehicleFeatureViewModel, VehicleFeature>()
                    .ForMember(x => x.Id, opt => opt.Ignore());

                //configuration.CreateMap<VehicleImage, VehicleImageViewModel>();
                //configuration.CreateMap<VehicleImageViewModel, VehicleImage>();

                configuration.CreateMap<VehicleModel, VehicleModelViewModel>().PreserveReferences()
                    .ForMember(x => x.DisplayName, opt => opt.MapFrom(xx => xx.VehicleManufacturer.Name + " " + xx.ModelCode));
                configuration.CreateMap<VehicleModelViewModel, VehicleModel>()
                    .ForMember(x => x.Id, opt => opt.Ignore());

                configuration.CreateMap<VehicleReport, VehicleReportViewModel>().PreserveReferences();
                configuration.CreateMap<VehicleReportViewModel, VehicleReport>()
                    .ForMember(x => x.Id, opt => opt.Ignore());

                configuration.CreateMap<VehicleReportItem, VehicleReportItemViewModel>().PreserveReferences();
                configuration.CreateMap<VehicleReportItemViewModel, VehicleReportItem>()
                    .ForMember(x => x.Id, opt => opt.Ignore());

                configuration.CreateMap<VehicleReview, VehicleReviewViewModel>().PreserveReferences();
                configuration.CreateMap<VehicleReviewViewModel, VehicleReview>()
                    .ForMember(x => x.Id, opt => opt.Ignore());

                configuration.CreateMap<VehicleImage, VehicleImageViewModel>().PreserveReferences()
                    .ForMember(x => x.Vehicle, conf => conf.Ignore()); 
                configuration.CreateMap<VehicleImageViewModel, VehicleImage>()
                    .ForMember(x => x.Id, opt => opt.Ignore());
                //configuration.CreateMap<PartnerContactPersonDisplayViewModel, PartnerContactPersonModel>()
                //    .ForMember(x => x.ContactInfos, opt => opt.Ignore());
            };

            Mapper.Initialize(configAction);
        }
    }
}