using System;
using AutoMapper;
using Ninject;
using X3Project.Application.IoCModules;
using X3Project.Application.ViewModels;
using X3Project.Domain.ViewModels.Partner;
using X3Project.Data.EntityFramework.Models;
using X3Project.Data.EntityFramework.Models.Assignmnet;
using X3Project.Data.EntityFramework.Models.Partner;
using X3Project.Data.EntityFramework.Models.User;
using X3Project.Data.EntityFramework.Models.Vehicle;
using X3Project.Domain.ViewModels.Account;
using X3Project.Domain.ViewModels.Assignment;
using X3Project.Domain.ViewModels.Partner.ContactPerson;
using X3Project.Domain.ViewModels.Partner.Vehicle;

namespace X3Project.Application
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
                //Account
                configuration.CreateMap<ApplicationUser, AccountDisplayViewModel>();
                configuration.CreateMap<AccountDisplayViewModel, ApplicationUser>()
                    .ForMember(x => x.ContactInfos, opt => opt.Ignore());
                configuration.CreateMap<UserContactInfo, AccountContactInfoDisplayModel>().ReverseMap();

                configuration.CreateMap<TodoModel, TodoDisplayViewModel>();
                configuration.CreateMap<TodoPostViewModel, TodoModel>();
                configuration.CreateMap<TodoPutViewModel, TodoModel>();

                //Partner
                configuration.CreateMap<PartnerModel, PartnerDisplayViewModel>();
                configuration.CreateMap<PartnerModel, PartnerPutViewModel>().ReverseMap();
                configuration.CreateMap<PartnerModel, PartnerStatusPutViewModel>().ReverseMap();

                //Partner contact person
                configuration.CreateMap<PartnerContactPersonModel, PartnerContactPersonDisplayViewModel>();
                configuration.CreateMap<PartnerContactPersonDisplayViewModel, PartnerContactPersonModel>()
                    .ForMember(x => x.ContactInfos, opt => opt.Ignore());

                configuration.CreateMap<PartnerContactPersonContactInfoModel, PartnerContactPersonInfoDisplayViewModel>().ReverseMap();

                configuration.CreateMap<VehicleModel, PartnerVehicleDisplayViewModel>().ReverseMap();
                configuration.CreateMap<VehicleModel, PartnerStatusPutViewModel>().ReverseMap();

                //Assignment
                configuration.CreateMap<AssignmentModel, AssignmentDisplayViewModel>();
            };

            Mapper.Initialize(configAction);
        }
    }
}