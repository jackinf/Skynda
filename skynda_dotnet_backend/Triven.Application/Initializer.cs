using System;
using AutoMapper;
using Ninject;
using Triven.Application.IoCModules;
using Triven.Data.EntityFramework.Models;
using Triven.Data.EntityFramework.Models.Assignmnet;
using Triven.Data.EntityFramework.Models.Partner;
using Triven.Data.EntityFramework.Models.User;
using Triven.Data.EntityFramework.Models.Vehicle;
using Triven.Domain.ViewModels;
using Triven.Domain.ViewModels.Account;
using Triven.Domain.ViewModels.Assignment;
using Triven.Domain.ViewModels.Partner;
using Triven.Domain.ViewModels.Partner.ContactPerson;
using Triven.Domain.ViewModels.Partner.Vehicle;

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