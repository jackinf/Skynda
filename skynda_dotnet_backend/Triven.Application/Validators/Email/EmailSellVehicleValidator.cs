using FluentValidation;
using Triven.Domain.ViewModels.Email;

namespace Triven.Application.Validators.Email
{
    public class EmailSellVehicleValidator : AbstractValidator<EmailSellVehicleViewModel>
    {
        public EmailSellVehicleValidator()
        {
            RuleFor(x => x.FullName).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Phone).NotEmpty();
            RuleFor(x => x.VehicleRegistrationMark).NotEmpty();
        }
    }
}