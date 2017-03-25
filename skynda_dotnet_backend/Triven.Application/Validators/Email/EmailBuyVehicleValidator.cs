using FluentValidation;
using Triven.Domain.ViewModels.Email;

namespace Triven.Application.Validators.Email
{
    public class EmailBuyVehicleValidator : AbstractValidator<EmailBuyVehicleViewModel>
    {
        public EmailBuyVehicleValidator()
        {
            RuleFor(x => x.FullName).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Phone).NotEmpty();
            RuleFor(x => x.Comment).NotEmpty();
            RuleFor(x => x.VehiclePk).NotEmpty();
        }
    }
}