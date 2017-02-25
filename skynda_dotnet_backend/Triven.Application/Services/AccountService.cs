using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using FluentValidation.Results;
using Microsoft.AspNet.Identity;
using Triven.Application.Results;
using Triven.Application.Validators.Users;
using Triven.Data.EntityFramework.Models.User;
using Triven.Domain.Constants;
using Triven.Domain.Repositories;
using Triven.Domain.Services;
using Triven.Domain.ViewModels.Account;

namespace Triven.Application.Services
{
    public class AccountService : IAccountService<ServiceResult>
    {
        private readonly ApplicationUserManager _userManager;
        private readonly IAccountRepository<ApplicationUser> _accountRepository;

        public AccountService(ApplicationUserManager userManager)
        {
            _userManager = userManager;
            _accountRepository = IoC.Get<IAccountRepository<ApplicationUser>>();
        }

        /// <summary>
        /// Add new user into system
        /// </summary>
        /// <param name="email"></param>
        /// <param name="password"></param>
        /// <param name="confirmPassword"></param>
        /// <param name="firstName"></param>
        /// <param name="lastName"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        public ServiceResult Register(string email, string password, string confirmPassword, string firstName = null, string lastName = null, Auth.Roles role = Auth.Roles.User)
        {
            var newUser = new ApplicationUser();
            newUser.UserName = newUser.Email = email;
            newUser.FirstName = firstName;
            newUser.LastName = lastName;
            newUser.Password = password;
            newUser.PasswordConfirm = confirmPassword;
            newUser.CreatedOn = DateTime.Now;
            newUser.IsActive = false;
            newUser.IsAdmin = false;
            newUser.EmailConfirmed = false;
            newUser.Status = Status.Active;
            newUser.CreatedOn = DateTime.Now;
            newUser.UpdatedOn = DateTime.Now;

            UserRegistrationValidator validator = new UserRegistrationValidator(_userManager);
            ValidationResult validation = validator.Validate(newUser);
            if (!validation.IsValid)
                return ServiceResult.Factory.Fail(validation);

            IdentityResult result = _userManager.CreateAsync(newUser, password).Result;
            if (!result.Succeeded)
                return ServiceResult.Factory.Fail(result.Errors);

            //add role for user
            if (!_userManager.IsInRole(newUser.Id, role.ToString()))
                _userManager.AddToRole(newUser.Id, role.ToString());

            return ServiceResult.Factory.Success(newUser);
        }

        public ServiceResult GetAccountData(int id)
        {
            var entity = _userManager.FindById(id);
            var applicationUser = entity as ApplicationUser;
            if (entity == null || applicationUser == null || applicationUser.Status == Status.Deleted)
                return ServiceResult.Factory.Fail(new List<string> { "User not found" });

            var foundViewModel = Mapper.Map<AccountDisplayViewModel>(applicationUser);
            return ServiceResult.Factory.Success(foundViewModel);
        }

        public ServiceResult UpdateUserAccountData(int id, AccountDisplayViewModel viewModel)
        {
            var entity = _userManager.FindById(id);
            var applicationUser = entity as ApplicationUser;
            var updateViewModel = viewModel ?? new AccountDisplayViewModel();
            if (entity == null || applicationUser == null || applicationUser.Status == Status.Deleted)
                return ServiceResult.Factory.Fail(new List<string> { "User not found" });

            var validator = new UserUpdateAccountDataValidator();
            var validation = validator.Validate(viewModel);
            if (!validation.IsValid)
                return ServiceResult.Factory.Fail(validation);

            var contactInfo = applicationUser.ContactInfos.FirstOrDefault(x => x.Id == updateViewModel.Id) ??
                              new UserContactInfo()
                              {
                                  Type = ContactInfoType.Work
                              };

            Mapper.Map(viewModel, applicationUser);
            if (!applicationUser.ContactInfos.Any())
                applicationUser.ContactInfos.Add(contactInfo);

            UserContactInfo contactPersonInfo = applicationUser.ContactInfos.First();
            if (updateViewModel.ContactInfos != null && updateViewModel.ContactInfos.Any())
            {
                Mapper.Map(updateViewModel.ContactInfos[0], contactPersonInfo);
                contactPersonInfo.Type = ContactInfoType.Work;
            }

            _userManager.Update(applicationUser);
            return ServiceResult.Factory.Success(id, "User data saved successfully");
        }

        public ServiceResult GetUsers()
        {
            var users = _accountRepository.GetAll().ToList();
            var foundViewModel = Mapper.Map<List<AccountDisplayViewModel>>(users);
            return ServiceResult.Factory.Success(foundViewModel);
        }
    }
}