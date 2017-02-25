using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using X3Project.Data.EntityFramework.Models.User;
using X3Project.Domain.ViewModels.Account;

namespace X3Project.Application.Validators.Users
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
