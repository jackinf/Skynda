using System;
using AutoMapper;
using Ninject;
using Triven.Application.IoCModules;
using Triven.Data.EntityFramework.Models.User;
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
                configuration.CreateMap<AccountDisplayViewModel, ApplicationUser>().ForMember(x => x.ContactInfos, opt => opt.Ignore());
                configuration.CreateMap<UserContactInfo, AccountContactInfoDisplayModel>().ReverseMap();
                
                //configuration.CreateMap<PartnerContactPersonDisplayViewModel, PartnerContactPersonModel>()
                //    .ForMember(x => x.ContactInfos, opt => opt.Ignore());
            };

            Mapper.Initialize(configAction);
        }
    }
}