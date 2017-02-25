using FluentValidation;
using Triven.Domain.ViewModels.Account;

namespace Triven.Application.Validators.Users
{
    public class UserUpdateAccountDataValidator : AbstractValidator<AccountDisplayViewModel>
    {
        public UserUpdateAccountDataValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("First name is requierd");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("Last name is requierd");
        }
    }
}
