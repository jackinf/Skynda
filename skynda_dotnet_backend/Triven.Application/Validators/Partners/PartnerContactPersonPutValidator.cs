using FluentValidation;
using Triven.Domain.ViewModels.Partner.ContactPerson;

namespace Triven.Application.Validators.Partners
{
    public class PartnerContactPersonPutValidator : AbstractValidator<PartnerContactPersonDisplayViewModel>
    {
        public PartnerContactPersonPutValidator()
        {
            RuleFor(partner => partner.FirstName).NotEmpty().WithMessage("First name is requierd");
            RuleFor(partner => partner.LastName).NotEmpty().WithMessage("Last name is requierd");
        }
    }
}
