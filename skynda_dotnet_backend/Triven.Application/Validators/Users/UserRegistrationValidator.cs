using FluentValidation;
using Triven.Application.Services;
using Triven.Data.EntityFramework.Entities.User;
using Triven.Domain.Constants;

namespace Triven.Application.Validators.Users
{
    public class UserRegistrationValidator : AbstractValidator<ApplicationUser>
    {
        private readonly ApplicationUserManager _applicationManager;

        public UserRegistrationValidator(ApplicationUserManager applicationManager)
        {
            this._applicationManager = applicationManager;
            RuleFor(user => user.Email)
                .NotEmpty().WithMessage("Email is requierd")
                .EmailAddress().WithMessage("Email is not valid");
            ////Equal to another property
            RuleFor(user => user.Password).NotEmpty().WithMessage("Password is requierd");
            RuleFor(user => user.Password).Equal(user => user.PasswordConfirm).WithMessage("Passwords don't match");
            RuleFor(user => user.Email).Must(EmailNotExists).WithMessage("Email already exists in the system");
        }

        /// <summary>
        /// Finds out if user with email already exists
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        private bool EmailNotExists(string email)
        {
            if (string.IsNullOrEmpty(email))
                return true;
            var result = _applicationManager.FindByEmailAsync(email);
            var appUser = result?.Result as ApplicationUser;
            if (appUser != null && appUser.Status != Status.Deleted)
                return false;

            return true;
        }
    }
}